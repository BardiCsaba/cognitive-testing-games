import * as common from '../../common/common.js';
import { StartScene } from './scenes/StartScene.js';
import { EndScene } from './scenes/EndScene.js';
import { MainScene } from './scenes/MainScene.js';

export function initialize(params) {
    // Define a function to calculate default values based on the level
    const defaultValuesFromLevel = (level) => {
        return {
            level: level,
        };
    };

    const gameScenes = [StartScene, MainScene, EndScene];
    common.initialize(params, defaultValuesFromLevel, gameScenes);
}