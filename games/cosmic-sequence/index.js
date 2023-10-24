import * as common from '../../common/common.js';
import { StartScene } from './scenes/StartScene.js';
import { EndScene } from './scenes/EndScene.js';
import { MainScene } from './scenes/MainScene.js';

export function initialize(params) {

    const defaultValuesFromLevel = (level) => {
        return {
            level: level,
            maxRound: 5 + Math.floor(level / 5) * 5, // Starts at 5, increases by 5 every 5 levels
            minAsteroidCount: 3,
            maxAsteroidCount: 3 + Math.floor(level / 5), // Starts at 3, increases by 1 every 5 levels
            maxHealthPoints: 5 - Math.floor(level / 5), // Starts at 5, decreases by 1 every 5 levels
            numbersVisibalityDuration: 5000 - Math.floor(level / 5) * 500, // Starts at 5000, decreases by 500 every 5 levels
            maxNumber: 10 + Math.floor(level / 5) * 5 // Starts at 10, increases by 5 every 5 levels
        };
    };

    // If the level is 0, use the given parameters, otherwise calculate default values based on the level
    const gameScenes = [StartScene, MainScene, EndScene];
    common.initialize(params, defaultValuesFromLevel, gameScenes);
}