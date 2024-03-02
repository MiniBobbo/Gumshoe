import { GameScene } from "../scenes/GameScene";

export interface IInstruction {
    type:InstructionType;
    blocking:boolean;
    start(gs:GameScene);
}

export enum InstructionType {
    Place,
    FadeIn,
    FadeOut,
    ChangeBackground,
}