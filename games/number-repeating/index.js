import { StartScene } from './scenes/StartScene.js';
import { EndScene } from './scenes/EndScene.js';
import { MainScene } from './scenes/MainScene.js';

export function initialize(params) {
	// Configuration for the Phaser game
    const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: 800,
        height: 600,
        scene: [StartScene, MainScene, EndScene],
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
    };

    // Create the Phaser game instance
    let game = new Phaser.Game(config);
    game.registry.set('params', params);
    game.scene.start('MainScene');
}