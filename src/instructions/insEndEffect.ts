import { SceneEvents } from "../enums/SceneEvents";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insEndEffect implements IInstruction {
    type: InstructionType = InstructionType.Flash;
    blocking: boolean = false;
    start(gs: GameScene) {
        gs.events.emit(SceneEvents.EndEffect, "go");
    }
    end(gs: GameScene) {
    }

}