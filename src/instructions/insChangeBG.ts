import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insChangeBG implements IInstruction {
    type: InstructionType = InstructionType.ChangeBackground;
    blocking: boolean = false;
    bg: string;
    constructor(bg:string) {
        this.bg = bg;
    }

    start(gs: GameScene) {
        gs.background.setFrame(this.bg);
    }
    end(gs: GameScene) {
    }

}