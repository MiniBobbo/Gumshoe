import { ScriptRunner } from "../helpers/ScriptRunner";

export class GameScene extends Phaser.Scene {
    background:Phaser.GameObjects.Sprite;
    sprites:Map<string, Phaser.GameObjects.Sprite>;
    nameBox:Phaser.GameObjects.Text;
    speechBox:Phaser.GameObjects.Text;
    create() {
        this.background = this.add.sprite(0,0,'atlas', 'Areas_0').setOrigin(0,0).setScale(4);
        this.sprites = new Map<string, Phaser.GameObjects.Sprite>();
        this.nameBox = this.add.text(2*4, 95*4, '').setFontSize(10*4);
        this.speechBox= this.add.text(10*4, 110*4, '').setFontSize(8*4).setWordWrapWidth(900);


        ScriptRunner.RunScript('Intro', this);


    }

    
}

export enum SceneState {
    LOADING,
    FADEIN,
    FADEOUT,
    RUNNING,
    WAITING,
}