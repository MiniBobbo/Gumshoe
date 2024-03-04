import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insFlash implements IInstruction {
    type: InstructionType = InstructionType.Flash;
    blocking: boolean = false;
    start(gs: GameScene) {
        gs.cameras.main.flash();
    }
    end(gs: GameScene) {
    }

}