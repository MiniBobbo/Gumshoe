import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insWait implements IInstruction {
    type: InstructionType = InstructionType.Wait;
    blocking: boolean = true;
    waitTime: number;
    constructor(waitTime: number = 1000) {
        this.waitTime = waitTime;
    }
    start(gs: GameScene) {
        gs.time.delayedCall(this.waitTime, () => {
            gs.events.emit('instructionComplete');
        });
    }
    end(gs: GameScene) {
    }

}