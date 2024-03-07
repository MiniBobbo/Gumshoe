import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insMove implements IInstruction {
    type: InstructionType = InstructionType.FadeSpriteIn;
    blocking: boolean = true;
    name: string;
    X: number;
    Y: number;
    alpha:number;

    constructor(name:string, x:number, y:number, alpha:number) {
        this.name = name;
        this.X = x;
        this.Y = y;
        this.alpha = alpha;
    }

    start(gs: GameScene) {
        let s = gs.sprites.get(this.name);
        if (s == undefined) {
            C.Write(`Error:  Sprite ${this.name} not found.  Can't fade in.`);
        } 

        gs.tweens.add({
            targets: s,
            alpha: 0,
            ease: 'Linear',
            duration: 150,
            repeat: 0,
            yoyo: false,
            callbackScope: this,
            onComplete: () => {
                s.setPosition(this.X*4, this.Y*4);                
                gs.tweens.add({
                    targets: s,
                    alpha: this.alpha,
                    ease: 'Linear',
                    duration: 150,
                    repeat: 0,
                    yoyo: false,
                    onComplete: () => {
                        gs.events.emit('instructionComplete');
                    }
                });
            }
        });

    }
    end(gs: GameScene) {
    }

}