export const EndScene = {
    key: 'EndScene',
    preload,
    create,
    update,
};

let startButton;

function preload() {
    this.load.setBaseURL('games/number-repeating/assets/');
}

function create() {
    const result = this.registry.get('result');
    const message = result ? 'You remembered correctly!' : 'Oops! Wrong sequence!';
        
    this.add.text(200, 300, message, {
        fontSize: '32px',
        fill: '#ffffff'
    }).setOrigin(0.5);

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