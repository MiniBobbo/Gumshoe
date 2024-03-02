import { IInstruction } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";

export class ScriptRunner {
    static RunScript(scriptName:string, gs:GameScene) {
        let script:string;
        let instructionQueue:Array<IInstruction> = [];
        try {
            script = gs.cache.text.get(scriptName);
        } catch {
            console.log(`Can't fetch script ${scriptName}`);
            return;
        }

        //Apparently Phaser doesn't throw an error when you try to load something that doesn't exist...
        if (script == undefined) {
            console.log(`Script ${scriptName} is undefined`);
            return;
        }
        

        console.log(`Starting script ${scriptName}`);
        //Queue up the instructions from the script we just loaded.
        //If there is an error or something we should log it.  
        
        let lines = script.split('\n');
        for (let l in lines) {
            // console.log(`Parsing line ${l}`);
            
        }


    }
}