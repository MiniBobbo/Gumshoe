import { GameScene } from "../scenes/GameScene";

export class SoundManager {
    gs:GameScene;

    constructor(gs:GameScene) {
        this.gs = gs;
    }

    PlaySound(name:string) {
        this.gs.sound.play(name);
    }
}