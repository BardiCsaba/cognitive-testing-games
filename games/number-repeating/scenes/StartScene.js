export const StartScene = {
    key: 'StartScene',
    preload,
    create
};

let retroStyle;

function preload() {
    this.load.setBaseURL('games/number-repeating/assets/');
    this.load.image('background', 'background.jpg');
}

function create() {
    retroStyle = this.registry.get('retrostyle');
    this.add.image(400, 300, 'background').setScale(1.7);

    this.add.text(400, 180, 'Egy számokból álló sorozatot fogsz hallani.', retroStyle).setOrigin(0.5);
    this.add.text(400, 240, 'Probáld meg a legjobb emlékezeted szerint beírni!', retroStyle).setOrigin(0.5);
    this.add.text(400, 300, 'Készen állsz?', retroStyle).setOrigin(0.5);

    // Create a "Start" button
    createStartButton(this, 400, 400, 'Start');
}

function createStartButton(scene, x, y, text) {
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
        scene.scene.start('MainScene');
    });
}