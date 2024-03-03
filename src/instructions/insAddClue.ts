import { SceneEvents } from "../enums/SceneEvents";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { ClueType, objClue } from "../objects/objClue";
import { GameScene } from "../scenes/GameScene";

export class insAddClue implements IInstruction{
    type: InstructionType;
    blocking:boolean;
    name:string;   
    cluetype:ClueType;

    constructor(name:string, cluetype: ClueType) {
        this.type = InstructionType.AddClue;
        this.blocking = false;
        this.name = name;
        this.cluetype = cluetype;
    }

    start(gs:GameScene) {
        console.log(`Adding clue ${this.name} type ${this.cluetype}`);
        gs.events.emit(SceneEvents.AddClue, this.name, this.cluetype);
        // I may want to add something else when a clue appears, so raise an event instead of just ading it to the array.  
        // gs.clues.push(new objClue(this.name, this.cluetype));    
    }

    end(gs) {
        if (!this.blocking) {
            gs.events.emit('instructionComplete');
        }
    }
}