import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insPlace implements IInstruction{
    name:string;
    x:number;
    y:number;
    animation:string;
    type: InstructionType = InstructionType.Place;
    blocking: boolean = false;

    constructor(name:string, x:number, y:number, animation:string) {
        this.name = name;
        //Scae up the x and y to match the scale of the background.  I want to define all the coordinates in the 
        //original image size.   
        this.x = x * 4;
        this.y = y * 4;
        this.animation = animation;
    }
    end(gs: GameScene) {
        
    }

    start(gs:GameScene) {
        let s = gs.sprites.get(this.name);
        let animName = `${this.name.toLowerCase()}_${this.animation.toLowerCase()}_0`;
        if (s == undefined) {
            s = gs.add.sprite(this.x, this.y, 'atlas', animName);
            gs.sprites.set(this.name, s);
        } else {
            s.x = this.x;
            s.y = this.y;
            s.setFrame(animName);
        }
    }

}