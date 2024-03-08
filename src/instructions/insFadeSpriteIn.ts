import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insFadeSpriteIn implements IInstruction {
    type: InstructionType = InstructionType.FadeSpriteIn;
    blocking: boolean = true;
    name: string;
    startAlpha: number;
    endAlpha: number;
    duration: number;
    constructor(name:string, startAlpha:number, endAlpha:number, duration:number) {
        this.name = name;
        this.startAlpha = startAlpha;
        this.endAlpha = endAlpha;
        this.duration = duration;
    }

    start(gs: GameScene) {
        let s = gs.sprites.get(this.name);
        s.setAlpha(this.startAlpha);
        if (s == undefined) {
            C.Write(`Error:  Sprite ${this.name} not found.  Can't fade in.`);
        } else {
            s.flipX = !s.flipX;
        }


        gs.tweens.add({
            targets: s,
            alpha: this.endAlpha,
            ease: 'Linear',
            duration: this.duration,
            repeat: 0,
            yoyo: false,
            onComplete: () => {
                gs.events.emit('instructionComplete');
            }
        });

    }
    end(gs: GameScene) {
    }

}