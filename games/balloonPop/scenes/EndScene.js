export const EndScene = {
    key: 'EndScene',
    preload,
    create,
    update,
};

function preload() {
    // Preload assets for this scene, e.g., background, button images, etc.
}

function create() {
    // Add final score and "Restart Game" button
    // On button click, transition back to StartScene or MainScene
    this.add.text(400, 300, 'Játéknak vége', { fontSize: '32px', fill: '#fff' });
    const restartButton = this.add.text(400, 400, 'Újrakezdés', { fontSize: '32px', fill: '#fff' });
    restartButton.setInteractive();
    restartButton.on('pointerdown', () => {
        this.scene.start('StartScene');
    });
}

function update() {
    // Optional update logic
}