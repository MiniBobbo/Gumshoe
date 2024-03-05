import { SceneEvents } from "../enums/SceneEvents";
import { ScriptRunner } from "../helpers/ScriptRunner";
import { insAddClue } from "../instructions/insAddClue";
import { ClueType, objClue } from "../objects/objClue";
import { NoticeMode } from "./NoticeMode";
import { ReasonMode } from "./ReasonMode";

export class GameScene extends Phaser.Scene {
    background:Phaser.GameObjects.Sprite;
    sprites:Map<string, Phaser.GameObjects.Sprite>;
    nameBox:Phaser.GameObjects.Text;
    speechBox:Phaser.GameObjects.Text;
    clues:Array<objClue> = [];
    sr:ScriptRunner;
    gameLayer:Phaser.GameObjects.Layer;
    hudLayer:Phaser.GameObjects.Layer;
    clueLayer:Phaser.GameObjects.Layer;

    noticeMode:NoticeMode;
    reasonMode:ReasonMode;
    
    create() {
        this.gameLayer = this.add.layer().setDepth(0);
        this.hudLayer = this.add.layer().setVisible(false).setDepth(1);
        this.clueLayer = this.add.layer().setDepth(2);

        this.background = this.add.sprite(0,0,'atlas', '').setOrigin(0,0).setScale(4);
        this.sprites = new Map<string, Phaser.GameObjects.Sprite>();
        this.nameBox = this.add.text(2*4, 95*4, '', { fontFamily: 'munro'}).setFontSize(10*4);
        this.speechBox= this.add.text(10*4, 108*4, '', { fontFamily: 'munro'}).setFontSize(8*4).setWordWrapWidth(900);

        this.gameLayer.add(this.background);
        this.noticeMode = new NoticeMode(this);
        this.reasonMode = new ReasonMode(this);

        this.CreateEvents();
        this.sr = new ScriptRunner(this);
        this.sr.RunScript('Intro', this);
    
        
        
    }

    CreateEvents() {
    }

    DestroyEvents() {
        this.events.removeListener(SceneEvents.AddClue);
    }


}

export enum SceneState {
    
    
}