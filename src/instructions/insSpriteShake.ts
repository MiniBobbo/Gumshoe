import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insSpriteShake implements IInstruction {
    type: InstructionType = InstructionType.Hop;
    blocking: boolean = false;
    name: string;

    constructor(name:string) {
        this.name = name;
    }

    start(gs: GameScene) {
        let s = gs.sprites.get(this.name);
        if (s == undefined) {
            C.Write(`Error:  Sprite ${this.name} not found.  Can't shake in.`);
        } 
        let startx = s.x;

        startx = startx -5;

        gs.tweens.add({
            targets: s,
            x:startx+2,
            ease: 'Linear',
            duration: 30,
            repeat: 5,
            yoyo: true,
            callbackScope: this,
            onComplete: () => {
                s.x = startx;
                // gs.events.emit('instructionComplete');
            }
        });

    }
    end(gs: GameScene) {
    }

}