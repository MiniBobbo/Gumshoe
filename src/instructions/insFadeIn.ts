import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insFadeIn implements IInstruction {
    type: InstructionType = InstructionType.FadeIn;
    blocking: boolean = true;
    start(gs: GameScene) {
        gs.gameLayer.setVisible(true);
        gs.tweens.add({
            targets: gs.gameLayer,
            alpha: 1,
            ease: 'Linear',
            duration: 1000,
            repeat: 0,
            yoyo: false,
            onComplete: () => {
                gs.events.emit('instructionComplete');
            }
        });

    }
    end(gs: GameScene) {
    }

}