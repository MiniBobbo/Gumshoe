import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insFlip implements IInstruction{
    name:string;
    x:number;
    y:number;
    animation:string;
    type: InstructionType = InstructionType.Place;
    blocking: boolean = false;

    constructor(name:string) {
        this.name = name;
    }
    end(gs: GameScene) {
        
    }

    start(gs:GameScene) {
        let s = gs.sprites.get(this.name);
        if (s == undefined) {
            C.Write(`Error:  Sprite ${this.name} not found.  Can't flip.`);
        } else {
            s.flipX = !s.flipX;
        }
    }

}