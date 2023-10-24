import * as common from '../../common/common.js';
import { StartScene } from './scenes/StartScene.js';
import { EndScene } from './scenes/EndScene.js';
import { MainScene } from './scenes/MainScene.js';

export function initialize(params) {

    const defaultValuesFromLevel = (level) => {
        const progression = Math.floor(level / 5);
        return {
            level,
            timeBetweenNumbers: 1500 - progression * 200,
            maxRound: 3 + progression,
            minNumberCount: 3 + progression,
            maxNumberCount: 3 + progression + progression
        };
    };

    const gameScenes = [StartScene, MainScene, EndScene];
    common.initialize(params, defaultValuesFromLevel, gameScenes);
}