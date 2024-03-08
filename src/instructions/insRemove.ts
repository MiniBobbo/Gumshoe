import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insRemove implements IInstruction{
    name:string;
    type: InstructionType = InstructionType.Remove;
    blocking: boolean = false;

    constructor(name:string) {
        this.name = name;
    }
    end(gs: GameScene) {
        
    }

    start(gs:GameScene) {
        let s = gs.sprites.get(this.name);
        if (s != undefined) {
            s.destroy();
            gs.sprites.delete(this.name);
        }
    }

}