export function initializeGame(params) {
	
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
		gameName: 'balloon-pop',
		//cosmic-control
		//cosmic-sequence
		//balloon-pop
		//number-repeating
		//number-total
		gameTitle: 'Számismétlés', 
		//Aszteroida sorrend 
		//Lufi pukkasztó
		//Számismétlés
		level: 1,
        game_id: 1,
		username: "testuser",
		access_token: "testtoken"
	};
}

// Fetch or mock parameters
const params = mockFetchParams(); // or real fetch from backend

// Initialize a specific game
initializeGame(params);

document.getElementById('fullscreen-btn').addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        let gameContainer = document.getElementById('game-container');
        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } else if (gameContainer.msRequestFullscreen) { /* IE/Edge */
            gameContainer.msRequestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) { /* Firefox */
            gameContainer.mozRequestFullScreen();
        } else if (gameContainer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            gameContainer.webkitRequestFullscreen();
        }
    }
});
