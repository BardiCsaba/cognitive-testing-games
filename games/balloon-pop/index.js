import * as common from '../../common/common.js';
import { StartScene } from './scenes/StartScene.js';
import { EndScene } from './scenes/EndScene.js';
import { MainScene } from './scenes/MainScene.js';

export function initialize(params) {
    // Define a function to calculate default values based on the level
    const defaultValuesFromLevel = (level) => {
        return {
            level: level,
            maxBalloons: 2 + Math.floor(level / 5),
            minSpeed: 2 + (level - 1) * 0.2,
            maxSpeed: 2 + (level - 1) * 0.2 + 2,
            maxHealthPoints: 100 - Math.floor(level / 5) * 10,
            gameTime: 100 - Math.floor(level / 5) * 10
        };
    };

    const gameScenes = [StartScene, MainScene, EndScene];
    common.initialize(params, defaultValuesFromLevel, gameScenes);
}