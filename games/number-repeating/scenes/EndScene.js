export const EndScene = {
    key: 'EndScene',
    preload,
    create
};

let retroStyle;
let soundSettings;

function preload() {
    this.load.setBaseURL('games/number-repeating/assets/');
    this.load.image('background', 'background.jpg');
}

function create() {
    retroStyle = this.registry.get('retrostyle');
    soundSettings = this.registry.get('soundSettings');

    this.add.image(400, 300, 'background').setScale(1.7);

    // Check result
    const result = this.registry.get('result');
    const resultText = result ? "Gratulálok! Sikerült!" : "Sajnálom, próbáld újra!";
    this.add.text(400, 200, resultText, retroStyle).setFontSize('32px').setOrigin(0.5);

    // Create a "Restart" button
    createRestartButton(this, 400, 400, 'Újra'); // Hungarian for "Again"
}

function createRestartButton(scene, x, y, text) {
    let buttonRect = scene.add.rectangle(x, y, 150, 60, 0x111111)
        .setOrigin(0.5)
        .setStrokeStyle(2, 0xA8FF98)
        .setInteractive();

    let buttonStyle = {
        ...retroStyle,
        fontSize: '32px'
    };

    let buttonText = scene.add.text(x, y, text, buttonStyle)
        .setOrigin(0.5);

    // Hover effect
    buttonRect.on('pointerover', function() {
        scene.tweens.killTweensOf(this);
        scene.tweens.add({
            targets: this,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
        });
    });
    buttonRect.on('pointerout', function() {
        scene.tweens.killTweensOf(this);
        scene.tweens.add({
            targets: this,
            scaleX: 1,
            scaleY: 1,
            duration: 100,
        });
    });

    buttonRect.on('pointerdown', () => {
        scene.sound.play('click', soundSettings);
        scene.scene.start('StartScene');
    });
}