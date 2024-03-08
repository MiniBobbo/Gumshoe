import { C } from "../C";
import { SceneEvents } from "../enums/SceneEvents";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { ClueType, objClue } from "../objects/objClue";
import { GameScene } from "../scenes/GameScene";

export class insAddObservation implements IInstruction{
    type: InstructionType;
    blocking:boolean;
    name:string;   
    description:string;

    constructor(name:string, description:string) {
        this.type = InstructionType.AddObservation;
        this.blocking = false;
        this.name = name;
        this.description = description;
    }

    start(gs:GameScene) {
        C.Write(`Adding observation. Name: ${this.name}, Description: ${this.description}`);
        gs.events.emit(SceneEvents.AddObservation, this.name, this.description);
        // I may want to add something else when a clue appears, so raise an event instead of just ading it to the array.  
        // gs.clues.push(new objClue(this.name, this.cluetype));    
        
    }

    end(gs) {
        if (!this.blocking) {
            // gs.events.emit('instructionComplete');
        }
    }
}