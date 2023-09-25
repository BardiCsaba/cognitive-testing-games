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

    // Create the Phaser game instance
    let game = new Phaser.Game(config);
    game.registry.set('params', params);
    game.registry.set('retrostyle', retroStyle);
    game.scene.start('StartScene');
}