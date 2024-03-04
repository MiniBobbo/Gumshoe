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
        this.script = script;
    }

    start(gs:GameScene) {
        console.log(`Running script ${this.script}`);
        gs.sr.RunScript(this.script, gs, this.insert);
    }

    end(gs) {
        if (!this.blocking) {
            gs.events.emit('instructionComplete');
        }
    }
}