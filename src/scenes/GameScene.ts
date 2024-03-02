import { ScriptRunner } from "../helpers/ScriptRunner";

export class GameScene extends Phaser.Scene {
    background:Phaser.GameObjects.Sprite;
    sprites:Map<string, Phaser.GameObjects.Sprite>;
    create() {
        this.background = this.add.sprite(0,0,'atlas', 'Areas_0').setOrigin(0,0).setScale(4);
        this.sprites = new Map<string, Phaser.GameObjects.Sprite>();

        ScriptRunner.RunScript('Intro2', this);


    }

    
}

export enum SceneState {
    LOADING,
    FADEIN,
    FADEOUT,
    RUNNING,
    WAITING,
}