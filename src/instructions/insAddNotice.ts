import { SceneEvents } from "../enums/SceneEvents";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { ClueType, objClue } from "../objects/objClue";
import { GameScene } from "../scenes/GameScene";

export class insAddNotice implements IInstruction{
    type: InstructionType = InstructionType.AddNotice;
    blocking: boolean = false;
    Name:string;
    Script:string;
    x:number;
    Y:number;
    W:number;
    H:number;

    constructor(name:string, script:string, x:number, y:number, w:number, h:number) {
        this.Name = name;
        this.Script = script;
        this.x = x;
        this.Y = y;
        this.W = w;
        this.H = h;
    }

    start(gs: GameScene) {
        //Add the notice to the notice mode list. 
        gs.noticeMode.AddNotice(this.Name, this.Script, this.x, this.Y, this.W, this.H);
    }

    end(gs: GameScene) {
        //Not sure we need this, but raise an event just in case.
        gs.events.emit(SceneEvents.AddNotice, this.Name, this.Script, this.x, this.Y, this.W, this.H);
    }
}