import { SceneEvents } from "../enums/SceneEvents";
import { ScriptRunner } from "../helpers/ScriptRunner";
import { ClueType, objClue } from "../objects/objClue";
import { objNotice } from "../objects/objNotice";
import { GameScene } from "./GameScene";

export class ReasonMode {
    gs:GameScene;
    Clues:Array<objClue> = [];
    active:boolean = false;
    nextScript:string;
    text:Phaser.GameObjects.Text;

    constructor(gs:GameScene) {
        this.gs = gs;
        this.gs.events.on(SceneEvents.AddClue, (name:string, clueType:ClueType) => {
            this.AddClue(name, clueType); 
        });
    }

    AddClue(name:string, clueType:ClueType) {
        let found = false;
        this.Clues.forEach((element) => {  
            if (element.Name == name) {
                console.log("Clue with name " + name + " already exists. Skipping.");
                found = true;
            }
        });

        //Ignore it if we alreadt created this...
        if(!found) {
            let c = new objClue(name, clueType, this.gs);
            this.Clues.push(c);
            c.SetPosition( 10, 10 + (this.Clues.length * 20));
        }
    }

    ClearClues() {
        this.Clues.forEach(element => {
            element.text.destroy();
        });
        this.Clues = [];
    }

    StartReasonMode(nextScript:string){
        this.active = true;
        this.gs.hudLayer.setVisible(true);
        this.nextScript = nextScript;

        this.Clues.forEach(element => {
            element.Activate();
        });
        this.gs.events.on(SceneEvents.CluePressed, (scriptName:string) => {
            this.Clues.forEach(element => {
                element.Deactivate();
            });
        });
        this.gs.events.on(SceneEvents.ClueReleased, (scriptName:string) => {
            this.Clues.forEach(element => {
                element.Activate();
            });
        });



        this.gs.events.on(SceneEvents.FinishedScript, () => {        
            
        });
    }

    EndReasonMode(){    
        this.active = false;
        this.gs.hudLayer.setVisible(false);
        this.ClearClues();
        this.gs.sr.RunScript(this.nextScript, this.gs);
        this.gs.events.removeListener(SceneEvents.StartScript);
        this.gs.events.removeListener(SceneEvents.FinishedScript);
    }
}