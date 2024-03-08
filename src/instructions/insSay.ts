import { C } from "../C";
import { SFX } from "../enums/SFX";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insSay implements IInstruction{
    gs:GameScene;
    name: string;
    text: string;
    type: InstructionType = InstructionType.Say;
    blocking: boolean = true;
    complete:boolean = false;
    timer:Phaser.Time.TimerEvent;
    count:number = 0;
    currentTime:number = 0;
    

    constructor(name: string, text: string) {
        this.name = name;
        this.text = text;
    }

    end(gs: GameScene) {
        gs.nameBox.setText('');
        gs.speechBox.setText('');
        this.timer.destroy();
        gs.input.removeListener('pointerdown');

    }

    start(gs: GameScene) {
        this.gs = gs;
        C.Write(`Saying ${this.text}`);
        this.count = 0;
        gs.nameBox.setText(this.name);
        // gs.speechBox.setText(this.text);

        this.timer = gs.time.addEvent({
            delay:C.LetterDelay,
            callback: this.NextLetter,
            callbackScope: this,
            loop: true
        });

        this.gs.events.on('preupdate', this.Update, this);
        //After clicking, check if we are in procress or finished.
        gs.input.on('pointerdown', () => {
            if(this.complete)
                gs.events.emit('instructionComplete');
            else {
                this.CompleteText();
            }
        });
    }
    Update(time:number, dt:number) {
        this.currentTime += dt;
        if(!this.complete && this.currentTime > C.LetterDelay) {
            this.currentTime = 0;
            this.NextLetter();
        }
    }

    NextLetter() {
        if(this.complete)
            return;
        this.count++;
        if(this.count >= this.text.length) {
            this.CompleteText();
        }
        else {
            this.gs.speechBox.setText(this.text.substr(0, this.count));
            SFX.say(this.name);
        }
    }

    CompleteText() {
        this.complete = true;
        this.gs.speechBox.setText(this.text);
    }

}