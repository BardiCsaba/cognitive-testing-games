export const StartScene = {
    key: 'StartScene',
    preload,
    create,
    update,
};

// Parameters
let MAX_BALLOONS;
let MIN_SPEED;
let MAX_SPEED;
let MAX_HEALTH_POINTS;
let LEVEL;
let GAME_TIME;

// Game variables
let params;

// Game objects
let scoreText;
let lifeBar;
let lifeText;
let counterText;

function preload() {
    this.load.setBaseURL('games/balloon-pop/assets/');
    this.load.image('background', 'background.png');
}

function getGameParameters() {
    params = this.registry.get('params');
    LEVEL = params ? params.level : 1; // Default to level 1 if not specified
    MAX_BALLOONS = 2 + Math.floor(LEVEL / 5);  // Starts at 2, increases by 1 every 5 levels
    MIN_SPEED = 2 + (LEVEL - 1) * 0.2;  // Starts at 2, increases by 0.2 for each level above 1
    MAX_SPEED = MIN_SPEED + 2;  // Max speed is always 2 units higher than min speed
    MAX_HEALTH_POINTS = 100 - Math.floor(LEVEL / 5) * 10; // Starts at 100, decreases by 10 every 5 levels
    GAME_TIME = 100 - Math.floor(LEVEL / 5) * 10; // Starts at 100, decreases by 10 every 5 levels

    console.log(`Level: ${LEVEL}\nMax balloons: ${MAX_BALLOONS}\nMin speed: ${MIN_SPEED}\nMax speed: ${MAX_SPEED}\nHealth points: ${MAX_HEALTH_POINTS}\nGame time: ${GAME_TIME}`);
}

function storeGameParameters() {
    this.registry.set('gameParams', {
        level: LEVEL,
        maxBalloons: MAX_BALLOONS,
        minSpeed: MIN_SPEED,
        maxSpeed: MAX_SPEED,
        maxHealthPoints: MAX_HEALTH_POINTS,
        gameTime: GAME_TIME,
    });
}

function create() {
    // Get game parameters
    getGameParameters.call(this);
    storeGameParameters.call(this);

    this.add.image(400, 300, 'background');

    // Add background shade for better visibility
    let textBackground = this.add.graphics();
    textBackground.fillStyle(0x000000, 0.3);  // Black with 60% opacity
    textBackground.fillRect(10, 170, 780, 220); // x, y, width, height
    
    // Add game rules
    this.add.text(30, 180, 'Játékszabályok:', { fontSize: '32px', fill: '#fff', fontStyle: 'bold' });
    this.add.text(30, 240, '1. Pukkantsd ki a színes lufikat, hogy pontokat szerezz.', { fontSize: '20px', fill: '#fff' });
    this.add.text(30, 280, '2. Kerüld a fekete léggömböket!', { fontSize: '20px', fill: '#fff' });
    this.add.text(30, 320, '3. A játéknak vége, ha az életpontod eléri a nullát.', { fontSize: '20px', fill: '#fff' });
    this.add.text(30, 360, `4. A játékidő ${GAME_TIME} másodperc.`, { fontSize: '20px', fill: '#fff' });

    // Create a button with graphics
    const button = this.add.graphics();
    button.fillStyle(0x328BA8, 1);
    button.fillRoundedRect(300, 425, 200, 50, 16);  // x and y adjusted
    button.setInteractive(new Phaser.Geom.Rectangle(300, 425, 200, 50), Phaser.Geom.Rectangle.Contains);

    // Add button text
    const buttonText = this.add.text(400, 450, 'Start', { fontSize: '32px', fill: '#fff', fontStyle: 'bold' });
    buttonText.setOrigin(0.5, 0.5);  // Centered

    // Add hover effect
    button.on('pointerover', () => {
        button.clear();
        button.fillStyle(0x7DA1AD, 1);  // Light blue for hover
        button.fillRoundedRect(300, 425, 200, 50, 16);
    });

    button.on('pointerout', () => {
        button.clear();
        button.fillStyle(0x328BA8, 1);  // Back to blue
        button.fillRoundedRect(300, 425, 200, 50, 16);
    });

    // Add interactivity
    button.on('pointerdown', () => {
        this.scene.start('MainScene');
    });

    // Add background shade for better visibility of the score and life bar
    let hudBackground = this.add.graphics();
    hudBackground.fillStyle(0x000000, 0.6);  // Black with 60% opacity
    hudBackground.fillRect(10, 10, 780, 50); // x, y, width, height

    // Initialize life bar
    lifeBar = this.add.graphics();
    lifeBar.fillStyle(0x00FF00, 1);
    lifeBar.fillRect(630, 20, MAX_HEALTH_POINTS * 1.5, 30);

    // Initialize texts 
    lifeText = this.add.text(520, 20, 'Élet:', { fontSize: '32px', fill: '#fff', fontStyle: 'bold', });
    scoreText = this.add.text(16, 20, 'Pont: 0', { fontSize: '32px', fill: '#fff', fontStyle: 'bold', });
    counterText = this.add.text(265, 20, `Idő: ${GAME_TIME}`, { fontSize: '32px', fill: '#fff', fontStyle: 'bold', });

    // Add level text
    this.add.text(10, 560, `Szint: ${LEVEL}`, {
        fontSize: '28px',
        fill: '#fff', 
        fontStyle: 'bold',
        stroke: '#888',
        strokeThickness: 2
    });
}

function update() {
    // Optional update logic
}
