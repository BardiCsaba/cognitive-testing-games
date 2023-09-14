export function initialize(params) {
	// Configuration for the Phaser game
    const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: 800,
        height: 600,
        scene: {
            preload,
            create,
            update
        }
    };

	// Constants for gameplay and maximum number of balloons
    const MAX_BALLOONS = 2;
    const MAX_SPEED = 6;
	const MIN_SPEED = 4;
    const balloonTypes = ['balloon_red', 'balloon_green', 'balloon_blue', 'balloon_orange', 'balloon_black'];

	// Initialize game variables
    let game = new Phaser.Game(config);
    let balloons;
    let score = 0;
    let scoreText;
    let occupiedPositions = [];
	let lifePoints = 100;  
	let lifeBar;
	let lifeText;


	// Preload assets
    function preload() {
        this.load.setBaseURL('games/balloonPop/assets/');
        this.load.image('background', 'background.png');
        balloonTypes.forEach(type => this.load.image(type, `${type}.png`));
    }

	// Create scene and spawn balloons
    function create() {
        // Initialize background
		this.add.image(400, 300, 'background');

		// Initialize balloons group
        balloons = this.add.group();
        this.input.topOnly = true;

		// Spawn initial set of balloons
        for (let i = 0; i < MAX_BALLOONS; i++) {
            spawnBalloon(this);
        }				

		// Add background shade for better visibility of the score and life bar
		let hudBackground = this.add.graphics();
		hudBackground.fillStyle(0x000000, 0.6);  // Black with 60% opacity
		hudBackground.fillRect(10, 10, 780, 50); // x, y, width, height

		// Initialize life bar
		lifeBar = this.add.graphics();
		lifeBar.fillStyle(0x00FF00, 1);
		lifeBar.fillRect(630, 20, lifePoints * 1.5, 30);

		// Initialize score and life text
		lifeText = this.add.text(520, 20, 'Élet:', { fontSize: '32px', fill: '#fff' });
		scoreText = this.add.text(16, 20, 'Pont: 0', { fontSize: '32px', fill: '#fff' });

		// Handle clicking on balloons
        this.input.on('pointerdown', pointer => popBalloonOnPointerDown(this, pointer));
    }

	// Update balloon positions
    function update() {
        balloons.children.iterate(updateBalloonPosition);
    }

	// Move balloon upwards
    function updateBalloonPosition(balloon) {
        balloon.y -= balloon.speed;
        if (balloon.y < -50) {
            resetBalloon(balloon);
        }
    }

	// Spawn a new balloon
    function spawnBalloon(scene) {
        const position = generateUniquePosition();
        const randomType = Phaser.Math.RND.pick(balloonTypes);
        const newBalloon = scene.add.sprite(position.x, position.y, randomType);
        newBalloon.setScale(0.3);
        newBalloon.speed = Phaser.Math.Between(MIN_SPEED, MAX_SPEED);
        balloons.add(newBalloon);
    }

	// Check for balloon pop when clicked
    function popBalloonOnPointerDown(scene, pointer) {
        const clickedBalloon = balloons.getChildren().find(balloon => 
            Phaser.Geom.Intersects.RectangleToRectangle(balloon.getBounds(), new Phaser.Geom.Rectangle(pointer.x, pointer.y, 1, 1))
        );

        if (clickedBalloon) {
            popBalloon(scene, clickedBalloon);
        }
    }

	// Handle balloon popping
    function popBalloon(scene, balloon) {
        const originalScale = 0.3;
        const tweensConfig = {
            duration: 100,
            yoyo: true,
            onComplete: () => resetBalloon(balloon)
        };

		// Check balloon type and update score accordingly
        if (balloon.texture.key === 'balloon_black') {
			lifePoints -= 10;  
			if (lifePoints < 0) lifePoints = 0;
			updateLifeBar();
            tweensConfig.angle = 360;
            tweensConfig.duration = 500;
			tweensConfig.yoyo = false;
        } else {
            score += 10;
            tweensConfig.scaleX = originalScale + 0.05;
            tweensConfig.scaleY = originalScale + 0.05;
        }

		// Add tween to balloon
        scene.tweens.add({
            targets: balloon,
            ...tweensConfig
        });

		// Update score display
        scoreText.setText(`Pont: ${score}`);
    }

	// Update the graphical representation of the life bar
	function updateLifeBar() {
		lifeBar.clear();
        lifeBar.fillStyle(lifePoints > 40 ? 0x00FF00 : 0xFF0000, 1);
		lifeBar.fillRect(630, 20, lifePoints * 1.5, 30);
	}


	// Reset balloon position and type
    function resetBalloon(balloon) {
        const position = generateUniquePosition();
        balloon.x = position.x;
        balloon.y = 650;
        balloon.setTexture(Phaser.Math.RND.pick(balloonTypes));
        balloon.setAngle(0);
    }

	// Generate a unique position for a new balloon
    function generateUniquePosition() {
        let position;
        do {
            position = {
                x: Phaser.Math.Between(100, 700),
                y: 600
            };
        } while (doesOverlap(position));

        occupiedPositions.push(position);
        if (occupiedPositions.length > MAX_BALLOONS) {
            occupiedPositions.shift();
        }

        return position;
    }

	// Check if a new position overlaps with existing positions
    function doesOverlap(newPosition) {
        return occupiedPositions.some(pos => Math.abs(pos.x - newPosition.x) < 100);
    }
}