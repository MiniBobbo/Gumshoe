import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insStartNotice implements IInstruction {
    type: InstructionType = InstructionType.StartNotice;
    blocking: boolean = true;
    nextScript:string;
    constructor(nextScript:string) {
        this.nextScript = nextScript;
    }

    start(gs: GameScene) {
        gs.noticeMode.StartNoticeMode(this.nextScript);
    }

    end(gs: GameScene) {
    }

}