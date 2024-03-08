import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insAnimate implements IInstruction{
    name:string;
    animation:string;
    type: InstructionType = InstructionType.Animate;
    blocking: boolean = false;

    constructor(name:string, anim:string) {
        this.name = name;
        this.animation = anim;
    }
    end(gs: GameScene) {
        
    }

    start(gs:GameScene) {
        let s = gs.sprites.get(this.name);
        if (s == undefined) {
            C.Write(`Error:  Sprite ${this.name} not found.  Can't animate.`);
        } else {
            let a = `${s.name.toLowerCase()}_${this.animation}_0`;
            s.setFrame(a);
        }
    }

}