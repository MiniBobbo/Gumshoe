import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insSetFlag implements IInstruction {
    type: InstructionType = InstructionType.SetFlag;
    blocking: boolean = false;
    flagName: string;   
    constructor(flagName: string) { 
        this.flagName = flagName;
    }
    start(gs: GameScene) {
        C.currentState.setFlag(this.flagName, true);
    }
    end(gs: GameScene) {
    }

}