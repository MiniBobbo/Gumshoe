import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insIf implements IInstruction {
    type: InstructionType = InstructionType.If;
    blocking: boolean = false;
    flags: string[];
    constructor(flags: string[]) { 
        this.flags = flags;
    }
    start(gs: GameScene) {
        this.flags.forEach(f => {
            if(!C.currentState.getFlag(f)) {
                gs.sr.SkipNextInsruction();
                return;
            }
        });
    }


    end(gs: GameScene) {
    }

}