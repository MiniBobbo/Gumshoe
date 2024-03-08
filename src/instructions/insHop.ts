import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insHop implements IInstruction {
    type: InstructionType = InstructionType.Hop;
    blocking: boolean = false;
    name: string;

    constructor(name:string) {
        this.name = name;
    }

    start(gs: GameScene) {
        let s = gs.sprites.get(this.name);
        if (s == undefined) {
            C.Write(`Error:  Sprite ${this.name} not found.  Can't fade in.`);
        } 
        s.scaleX = .8;
        s.scaleY = 1.2;

        gs.tweens.add({
            targets: s,
            scaleX:1,
            scaleY:1,
            ease: 'Linear',
            duration: 100,
            repeat: 0,
            yoyo: false,
            callbackScope: this,
            onComplete: () => {
                gs.events.emit('instructionComplete');
            }
        });

    }
    end(gs: GameScene) {
    }

}