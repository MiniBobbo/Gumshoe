import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insFadeOut implements IInstruction {
    type: InstructionType = InstructionType.FadeOut;
    blocking: boolean = true;
    start(gs: GameScene) {
        gs.tweens.add({
            targets: gs.gameLayer,
            alpha: 0,
            ease: 'Linear',
            duration: 1000,
            repeat: 0,
            yoyo: false,
            onComplete: () => {
                gs.gameLayer.setVisible(false);
                gs.events.emit('instructionComplete');
            }
        });

    }
    end(gs: GameScene) {
    }

}