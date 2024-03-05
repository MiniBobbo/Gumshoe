import { C } from "../C";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insSay implements IInstruction{
    name: string;
    text: string;
    type: InstructionType = InstructionType.Say;
    blocking: boolean = true;

    constructor(name: string, text: string) {
        this.name = name;
        this.text = text;
    }
    end(gs: GameScene) {

    }

    start(gs: GameScene) {
        C.Write(`Saying ${this.text}`);
        gs.nameBox.setText(this.name);
        gs.speechBox.setText(this.text);
        //After clicking, i cna go to the next event.
        gs.input.once('pointerdown', () => {
            gs.events.emit('instructionComplete');
        });
    }

}