import { C } from "../C";
import { SceneEvents } from "../enums/SceneEvents";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { ClueType, objClue } from "../objects/objClue";
import { GameScene } from "../scenes/GameScene";

export class insAddAssumption implements IInstruction{
    type: InstructionType;
    blocking:boolean;
    description:string;

    constructor(description:string) {
        this.type = InstructionType.AddAssumption;
        this.blocking = false;
        this.description = description;
    }

    start(gs:GameScene) {
        C.Write(`Adding assumption ${this.description}`);
        gs.events.emit(SceneEvents.AddAssumption, this.description);
    }

    end(gs) {
        if (!this.blocking) {
            
        }
    }
}