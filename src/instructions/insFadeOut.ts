import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insFadeOut implements IInstruction {
    type: InstructionType = InstructionType.FadeOut;
    blocking: boolean = true;
    start(gs: GameScene) {
        gs.gameLayer.setVisible(false);
        gs.events.emit('instructionComplete');
    }
    end(gs: GameScene) {
    }

}