import { C } from "../C";
import { SFX } from "../enums/SFX";
import { SceneEvents } from "../enums/SceneEvents";
import { objAssumption } from "../objects/objAssumption";
import { ClueType, objClue } from "../objects/objClue";
import { objObservation } from "../objects/objObservation";
import { GameScene } from "./GameScene";

export class ReasonMode {
    gs:GameScene;
    Clues:Array<objClue> = [];
    Assumptions:Array<objAssumption> = [];
    Observations:Array<objObservation> = [];
    active:boolean = false;
    nextScript:string;
    text:Phaser.GameObjects.Text;
    selectedText:Phaser.GameObjects.Text;
    selectedClue:{name:string,type:ClueType};
    g:Phaser.GameObjects.Graphics;
    observation:Phaser.GameObjects.Text;
    conclusions:Phaser.GameObjects.Text;
    clues:Phaser.GameObjects.Text;


    constructor(gs:GameScene) {
        this.gs = gs;
        this.gs.events.on(SceneEvents.AddClue, (name:string, clueType:ClueType) => {
            this.AddClue(name, clueType); 
        });
        this.gs.events.on(SceneEvents.AddAssumption, (description:string) => {
            this.AddAssumption(description); 
        });
        this.gs.events.on(SceneEvents.AddObservation, (name:string, description:string) => {
            this.AddObservation(name, description); 
        });
        this.g = gs.add.graphics();
        this.g.fillStyle(0x000000, 0.8);
        this.g.fillRect(0,0,960,540).setScrollFactor(0,0);
        this.gs.clueLayer.setVisible(false);
        this.gs.clueLayer.add(this.g);
        this.selectedText = gs.add.text(10, 10, "", { fontFamily: 'munro'}).setFontSize(6*4)
        .setWordWrapWidth(20).setStroke('black', 4).setScrollFactor(0,0).setDepth(3);
        this.gs.clueLayer.add(this.selectedText);

        this.observation = gs.add.text(55, 14, "Observations", { fontFamily: 'munro'}).setFontSize(6*4)

        this.gs.clueLayer.add(this.observation);


    }
    AddObservation(name: string, description: string) {
        let found = false;
        this.Observations.forEach((element) => {  
            if (element.ID == name) {
                C.Write("Observation with name " + name + " already exists. Skipping.");
                found = true;
            }
        });
        if(found) return;
        let o = new objObservation(this.gs, name, description);
        this.Observations.push(o);
    }

    AddAssumption(description: string) {
        let a = new objAssumption(this.gs, description);
        this.Assumptions.push(a);
    }

    AddClue(name:string, clueType:ClueType) {
        let found = false;
        this.Clues.forEach((element) => {  
            if (element.Name == name) {
                C.Write("Clue with name " + name + " already exists. Skipping.");
                found = true;
            }
        });

        //Ignore it if we alreadt created this...
        if(!found) {
            let c = new objClue(name, clueType, this.gs);
            this.Clues.push(c);
            // c.SetPosition( 10, 1 + (this.Clues.length * 30));
        }
    }

    ClearClues() {
        this.Clues.forEach(element => {
            element.text.destroy();
        });
        this.Clues = [];
    }

    StartReasonMode(nextScript:string, message:string = '') {
        //Move the observations to the correct locations
        let ypos = 34;
        for(let i = 0; i < this.Observations.length; i++) {
            this.Observations[i].SetPosition(17, ypos);
            //Drop in animation
            this.Observations[i].text.setScale(2,2);
            this.gs.time.delayedCall(i*200, () => {
                this.gs.tweens.add({
                    targets: this.Observations[i].text,
                    scaleY: 1,
                    scaleX: 1,
                    ease: 'Linear',
                    duration: 300,
                    repeat: 0,
                    yoyo: false,
                    onComplete: () => {
                        this.gs.sound.play(SFX.thump, {volume: 0.5})
                    }

                });
            
            });

            ypos += this.Observations[i].text.height + 10;
        }

        let clues:Phaser.GameObjects.Text[] = [];
        this.Clues.forEach(element => {
            clues.push(element.text);
        });
        Phaser.Actions.GridAlign(clues, {
            width: 6,
            height: 10,
            cellWidth: 130,
            cellHeight: 32,
            x: 200,
            y: 340
        });
        
        this.active = true;
        this.gs.clueLayer.setVisible(true);
        this.nextScript = nextScript;
        this.gs.events.on('preupdate', () => {  
            this.selectedText.setPosition(this.gs.input.mousePointer.x-10, this.gs.input.mousePointer.y-5); 
        });

        this.Clues.forEach(element => {
            element.Activate();
        });
        this.Assumptions.forEach(element => {
            element.Activate();
        });

        this.gs.events.on(SceneEvents.AssumptionCorrect, () => {
            let allCorrect = true;
            this.Assumptions.forEach(assumption => {
                if(!assumption.Correct)
                    allCorrect = false;
            });
            this.EndReasonMode();
        });

        this.gs.events.on(SceneEvents.CluePressed, (clue:{name:string,type:ClueType}) => {
            this.Clues.forEach(element => {
                this.selectedClue = clue;
                this.selectedText.setText(clue.name);
                this.selectedText.setVisible(true); 

                // element.Deactivate();
            });
        });
        this.gs.input.on('pointerup', (scriptName:string) => {
            this.Clues.forEach(element => {
                //TODO: Add the drop logic.
                this.selectedText.setVisible(false);
                if(this.selectedClue == null)
                    return;
                this.selectedClue.name = '';
                this.selectedClue.type = ClueType.None;
                // element.Activate();
            });
        });
        this.gs.events.on(SceneEvents.FinishedScript, () => {        
            
        });
    }

    EndReasonMode(){    
        this.gs.events.emit(SceneEvents.FlashMessage, "Reasoning complete!", 4000);
        this.gs.time.addEvent({
            delay: 4000,
            callback: () => {
                this.active = false;
                this.gs.clueLayer.setVisible(false);
                //This may be a problem.  Will this remove any other preupdate events and make stuff not work in the future?
                this.gs.events.removeListener('preupdate');
        
                this.selectedText.setVisible(false);
                this.selectedClue.name = '';
                this.selectedClue.type = ClueType.None;
                
                this.ClearClues();
                this.gs.sr.RunScript(this.nextScript, this.gs);
                this.gs.events.removeListener(SceneEvents.CluePressed);
                this.gs.events.removeListener(SceneEvents.FinishedScript);
                }
        });
    }
}