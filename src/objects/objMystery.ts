import { C } from "../C";
import { SFX } from "../enums/SFX";
import { SceneEvents } from "../enums/SceneEvents";
import { GameScene } from "../scenes/GameScene";
import { ClueType } from "./objClue";

export class objMystery {
    gs:GameScene;
    type:ClueType;
    answers:Array<string> =[];
    selectedAnswer:string = '';
    defaultAnswer:string = '';
    sprite:Phaser.GameObjects.NineSlice;
    text:Phaser.GameObjects.Text;
    correct:boolean = false;

    constructor(gs, type:ClueType, answers:Array<string>, defaultAnswer:string = '') {
        this.gs = gs;
        this.type = type;
        this.defaultAnswer = defaultAnswer;
        this.answers = answers;
        this.sprite = gs.add.nineslice(0, 0, 'atlas', 'AnswerBox', 30,C.ClueHeight-4,4,4,4,4)
        .setOrigin(0,0).setScale(4).setInteractive().setTint(this.getColor(type)).setDepth(1);
        this.gs.clueLayer.add(this.sprite);
        this.selectedAnswer = defaultAnswer;
        this.text = gs.add.text(0,0, defaultAnswer, { fontFamily: 'munro'}).setFontSize(C.AssumptionTextSize).setOrigin(0,0).setTint(0x555555).setDepth(2);
        this.gs.clueLayer.add(this.text);
    }

    Activate() {
        this.sprite.on('pointerdown', (pointer, localx, localy, event:Phaser.Types.Input.EventData)=>{
            // event.stopPropagation();
            this.text.setText(this.defaultAnswer).setTint(0x555555);
        
            this.correct = false;
            this.gs.sound.play(SFX.click);
        })

        this.sprite.on('pointerup', (pointer, localx, localy, event:Phaser.Types.Input.EventData) => {
            C.Write(`Dropped ${this.gs.reasonMode.selectedClue.name}`);
            if(this.gs.reasonMode.selectedClue.type == this.type) {
                this.text.setText(this.gs.reasonMode.selectedClue.name).setTint(0x000000);
                this.gs.sound.play(SFX.click);
                if(this.answers.indexOf(this.gs.reasonMode.selectedClue.name.toLowerCase()) > -1) {
                    this.correct = true;
                    this.gs.events.emit(SceneEvents.MysteryCorrect, this.gs.reasonMode.selectedClue.name);
                }
            }
            // event.stopPropagation();

            
        });
    }

    Deactivate() {
        this.sprite.removeListener('pointerup');
        this.sprite.removeListener('pointerdown');
    }


    SetPosition(x:number, y:number) {
        this.sprite.x = x;
        this.sprite.y = y -2;
        this.text.x = x + 6;
        this.text.y = y + 0;
    }
    
    getColor(type: ClueType): number {
        switch (type) {
            case ClueType.Object:
                return 0x00ff00;
            case ClueType.Verb:
                return 0xff0000;
            case ClueType.Location:
                return 0x0000ff;
            case ClueType.Person:
                return 0xffff00;
        }
    }
    
}