import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insPlace implements IInstruction{
    name:string;
    x:number;
    y:number;
    animation:string;
    type: InstructionType = InstructionType.Place;
    blocking: boolean = false;

    constructor() {
    }
    end(gs: GameScene) {
        if(!this.blocking) {
            gs.events.emit('instructionComplete');
        }   
    }

    start(gs:GameScene) {

    }

}