import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insShake implements IInstruction {
    type: InstructionType = InstructionType.Shake;
    blocking: boolean = false;
    start(gs: GameScene) {
        gs.cameras.main.shake(200, 0.01);
    }
    end(gs: GameScene) {
    }

}