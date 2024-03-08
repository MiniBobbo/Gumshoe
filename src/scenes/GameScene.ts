import { SFX } from "../enums/SFX";
import { SceneEvents } from "../enums/SceneEvents";
import { EffectManager } from "../helpers/EffectManager";
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
    speechIcon:Phaser.GameObjects.Text;
    clues:Array<objClue> = [];
    sr:ScriptRunner;
    gameLayer:Phaser.GameObjects.Layer;
    hudLayer:Phaser.GameObjects.Layer;
    clueLayer:Phaser.GameObjects.Layer;
    effectLayer:Phaser.GameObjects.Layer;

    noticeMode:NoticeMode;
    reasonMode:ReasonMode;
    effectManager:EffectManager;

    debugMessage:Phaser.GameObjects.Text;

    preload() {
        // let scripts = this.cache.text.get('allScripts');
        // let lines = scripts.split(',');
        // for (let l of lines) {
        //     this.loadScript(l);
        // }
    }

    loadScript(name:string) {
        this.load.text(name, `scripts/${name}.txt`);
    }


    create() {
        this.gameLayer = this.add.layer().setDepth(0).setAlpha(0);
        this.hudLayer = this.add.layer().setVisible(false).setDepth(2);
        this.clueLayer = this.add.layer().setDepth(3);
        this.effectLayer = this.add.layer().setDepth(1);

        SFX.setGameScene(this);

        this.background = this.add.sprite(0,0,'atlas','').setOrigin(0,0).setScale(4);
        this.sprites = new Map<string, Phaser.GameObjects.Sprite>();
        this.nameBox = this.add.text(2*4, 95*4, '', { fontFamily: 'munro'}).setFontSize(10*4);
        this.speechBox= this.add.text(10*4, 108*4, '', { fontFamily: 'munro'}).setFontSize(8*4).setWordWrapWidth(900);
        this.speechIcon = this.add.text(230*4, 130*4, '^', { fontFamily: 'munro'}).setFontSize(8*4).setWordWrapWidth(900);

        this.gameLayer.add(this.background);
        this.noticeMode = new NoticeMode(this);
        this.reasonMode = new ReasonMode(this);
        this.effectManager = new EffectManager(this);

        this.CreateEvents();
        this.sr = new ScriptRunner(this);
        this.sr.RunScript('Intro', this);
    
        this.debugMessage = this.add.text(10, 10, '', { fontFamily: 'munro'}).setFontSize(30).setDepth(1000).setVisible(false);
        this.events.on(SceneEvents.DebugMessage, (message:string) => {
            this.debugMessage.text = message;
        });
        
        
    }

    CreateEvents() {
        this.events.on(SceneEvents.FlashMessage, (message:string, time:number) => {
            let t = this.add.text(2000, 300, message, { fontFamily: 'munro'}).setFontSize(40*4).setOrigin(0.5,0.5).setDepth(4);
            this.tweens.add({
                targets: t,
                x: -2000,
                ease: 'Linear',
                duration: time,
                repeat: 0,
                yoyo: false,
                onComplete: () => {
                    t.destroy();
                }
            });
        });
    }

    DestroyEvents() {
        this.events.removeListener(SceneEvents.AddClue);
    }


}

export enum SceneState {
    
    
}