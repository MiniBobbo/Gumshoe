import { SFX } from "../enums/SFX";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insPlaySound implements IInstruction {
    type: InstructionType = InstructionType.PlaySound;
    blocking: boolean = false;
    sound:string;
    constructor(sound:string) {
        this.sound = sound;
    }
    start(gs: GameScene) {
        SFX.play(this.sound);
    }
    end(gs: GameScene) {
    }

}