export const StartScene = {
    key: 'StartScene',
    preload,
    create,
    update,
};

let startButton;

function preload() {
    this.load.setBaseURL('games/number-repeating/assets/');
}

function create() {
    startButton = this.add.text(400, 300, 'START', {
        fontSize: '32px',
        fill: '#ffffff'
    }).setOrigin(0.5);

    startButton.setInteractive();
    startButton.on('pointerdown', () => {
        this.scene.start('MainScene');
    });
}

function update() {
}