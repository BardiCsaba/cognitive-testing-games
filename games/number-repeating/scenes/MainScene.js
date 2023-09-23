export const MainScene = {
    key: 'MainScene',
    preload,
    create,
    update,
};

// Game variables
let currentRound = 1;
let inputEnabled = false;
let numberSequence = [];
let inputSequence = [];
let currentIndex = 0;

// Game objects
let inputDisplay;

const retroStyle = {
    fontSize: '26px',
    fill: '#A8FF98',  // Retro greenish color
    fontFamily: 'Courier New',
    shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#A8FF98',  // Glow effect
        blur: 8,
        fill: true
    }
};

function preload() {
    this.load.setBaseURL('games/number-repeating/assets/');
    
    for (let i = 1; i <= 9; i++) {
        this.load.audio(`${i}`, [`${i}.mp3`]);
    }

    this.load.image('background', 'background.jpg');
}

function create() {
    this.add.image(400, 300, 'background').setScale(1.7);

    this.add.text(400, 50, 'Listen to the sequence:', retroStyle).setFontSize('32px').setOrigin(0.5);

    // Digital-style input display
    inputDisplay = this.add.text(400, 100, '', retroStyle).setFontSize('32px').setOrigin(0.5);

    // Adding on-screen number buttons 1-9
    for (let i = 1; i <= 9; i++) {
        let xPos = 270 + ((i - 1) % 3) * 125;
        let yPos = 225 + Math.floor((i - 1) / 3) * 100;

        createNumberButton(this, xPos, yPos, `${i}`);
    }

    // Additional row for 'C', '0', and 'OK' buttons
    createNumberButton(this, 270, 525, 'C');
    createNumberButton(this, 395, 525, '0');
    createNumberButton(this, 520, 525, 'OK');

    startGame.call(this);
}

function startGame() {
    // Clear previous sequences
    numberSequence = [];
    inputSequence = [];
    currentIndex = 0;

    // Generate a sequence based on the current round
    for (let i = 0; i < 5 + currentRound - 1; i++) {
        numberSequence.push(Phaser.Math.Between(1, 9));
    }

    // After the sequence playback, enable input
    this.time.delayedCall(1000 * numberSequence.length, () => {
        inputEnabled = true;
    });

    // Initialize the timer
    const timer = this.time.addEvent({
        delay: 1000,
        callback: playNextNumber,
        callbackScope: this,
        repeat: numberSequence.length - 1
    });
}

function createNumberButton(scene, x, y, text) {
    let bgColor = 0x111111;
    if (text === 'C') {
        bgColor = 0x333333; // Red
    } else if (text === 'OK') {
        bgColor = 0x333333; // Green
    } else {
        bgColor = 0x111111; // Dark gray for number buttons
    }

    // Create a rectangle for the button
    let buttonRect = scene.add.rectangle(x, y, 75, 50, bgColor)
        .setOrigin(0.5)
        .setStrokeStyle(2, 0xA8FF98)  // Green outline
        .setInteractive();  // Make it interactive

    let buttonStyle = retroStyle;
    if (text === 'C' || text === 'OK') {
        buttonStyle = {
            ...retroStyle,
            fontSize: '32px' // Larger font size for 'C' and 'OK'
        };
    }

    let buttonText = scene.add.text(x, y, text, buttonStyle)
        .setOrigin(0.5);


    // Hover effect with smooth transition
    buttonRect.on('pointerover', function() {
        scene.tweens.killTweensOf(this); // Stop any tweens on this container
        scene.tweens.add({
            targets: this,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
        });
    });
    buttonRect.on('pointerout', function() {
        scene.tweens.killTweensOf(this); // Stop any tweens on this container
        scene.tweens.add({
            targets: this,
            scaleX: 1,
            scaleY: 1,
            duration: 100,
        });
    });

    buttonRect.on('pointerdown', () => {
        if (!inputEnabled) return;  // Prevent input if not enabled

        if (text === 'C') {
            inputSequence = [];
            updateInputDisplay();
        } else if (text === 'OK') {
            const result = JSON.stringify(inputSequence) === JSON.stringify(numberSequence);
            if (result) {
                currentRound++;  // Move to the next round
                scene.create();  // Reinitialize the scene for the next round
            } else {
                scene.registry.set('result', result);
                scene.scene.start('EndScene');
            }
        } else {
            inputSequence.push(parseInt(text));
            updateInputDisplay();
        }
    });
}

function updateInputDisplay() {
    inputDisplay.text = inputSequence.join(' ');
}

function playNextNumber() {
    if (currentIndex < numberSequence.length) {
        const number = numberSequence[currentIndex];
        this.sound.play(`${number}`);
        currentIndex++;
    }
}

function update() {
}
