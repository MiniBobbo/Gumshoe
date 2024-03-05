import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insStartReason implements IInstruction {
    type: InstructionType = InstructionType.StartNotice;
    blocking: boolean = true;
    nextScript:string;
    constructor(nextScript:string) {
        this.nextScript = nextScript;
    }

    start(gs: GameScene) {
        gs.reasonMode.StartReasonMode(this.nextScript);
    }

    end(gs: GameScene) {
    }

}