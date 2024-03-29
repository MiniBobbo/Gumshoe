import { C } from "../C";
import { ScriptRunner } from "../helpers/ScriptRunner";
import { IInstruction, InstructionType } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class insRunScript implements IInstruction{
    script: string;
    type: InstructionType = InstructionType.RunScript;
    insert: boolean = false;
    blocking: boolean = false;

    constructor(script: string, insert:boolean = false) {
        this.blocking = true;
        this.insert = insert;
        let s = script.replace("\\" , "/");
        this.script = s;
    }

    start(gs:GameScene) {
        C.Write(`Running script ${this.script}`);
        gs.sr.RunScript(this.script, gs, this.insert);
    }

    end(gs) {
        if (!this.blocking) {
            gs.events.emit('instructionComplete');
        }
    }
}