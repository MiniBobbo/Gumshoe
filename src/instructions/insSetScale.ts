import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insSetScale implements IInstruction {
    type: InstructionType = InstructionType.SetScale;
    blocking: boolean = false;
    name: string;
    scaleX: number;
    scaleY: number;

    constructor(name:string, scaleX:number, scaleY:number) {
        this.name = name;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }

    start(gs: GameScene) {
        let s = gs.sprites.get(this.name);
        if (s == undefined) {
            C.Write(`Error:  Sprite ${this.name} not found.  Can't scale.`);
        } 
        s.setScale(this.scaleX, this.scaleY);
    }
    end(gs: GameScene) {
    }

}