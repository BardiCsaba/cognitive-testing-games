// main.js
/*
// Fetch game parameters from backend
fetch('http://localhost:8080/api/game/params/balloonPop')
  .then(response => response.json())
  .then(params => {
    // Initialize game with parameters
    initializeGame(params);
  })
  .catch(error => {
    console.error('Error fetching game parameters:', error);
  });
*/

function initializeGame(params) {
	
	document.querySelector("header h1").innerText = params.gameTitle;

	switch (params.gameName) {
		case 'balloonPop':
			// Import and initialize Balloon Pop game
			import('./games/balloonPop/index.js')
				.then(gameModule => {
					gameModule.initialize(params);
				});
			break;
		default:
			console.error("Unknown game");
			break;
	}
}

function mockFetchParams() {
	return {
		gameName: 'balloonPop',
		gameTitle: 'Lufi pukkasztó',
		difficulty: '5'
	};
}

// Fetch or mock parameters
const params = mockFetchParams(); // or real fetch from backend

// Initialize a specific game
initializeGame(params);
