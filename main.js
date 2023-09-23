// main.js
/*
// Fetch game parameters from backend
fetch('http://localhost:8080/api/game/params/balloon-pop')
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

	import(`./games/${params.gameName}/index.js`)
		.then(gameModule => {
			gameModule.initialize(params);
		})
		.catch(err => {
			console.error("Failed to load the game module:", err);
		});
}

function mockFetchParams() {
	return {
		gameName: 'number-repeating', 
		//cosmic-sequence
		//balloon-pop
		//number-repeating
		gameTitle: 'Számismétlés', 
		//Aszteroida sorrend 
		//Lufi pukkasztó
		//Számismétlés
		level: 5,
	};
}

// Fetch or mock parameters
const params = mockFetchParams(); // or real fetch from backend

// Initialize a specific game
initializeGame(params);
