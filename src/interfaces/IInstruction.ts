import { GameScene } from "../scenes/GameScene";

export interface IInstruction {
    type:InstructionType;
    blocking:boolean;
    start(gs:GameScene);
    end(gs:GameScene);
}
































export enum InstructionType {
    Place,
    FadeIn,
    FadeOut,
    ChangeBackground,
    Say,
    Shake,
    AddClue,
    RunScript,
    Flash,
    AddNotice,
    StartNotice,
    SetFlag,
    If,
    Wait,
    AddAssumption,
    FadeSpriteIn,
    Hop
}