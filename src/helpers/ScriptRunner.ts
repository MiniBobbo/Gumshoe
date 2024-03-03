import { insPlace } from "../instructions/insPlace";
import { IInstruction } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";
import { insSay } from "../instructions/insSay";
import { insShake } from "../instructions/insShake";
import { insAddClue } from "../instructions/insAddClue";
import { ClueType } from "../objects/objClue";

export class ScriptRunner {
    static RunScript(scriptName:string, gs:GameScene) {
        let instructionQueue:Array<IInstruction> = [];
        this.PrepQueue(scriptName, gs, instructionQueue);
        
        //Set uip the event listener for when the instruction is complete.
        gs.events.on('instructionComplete', () => {
            this.RunNextInstruction(gs, instructionQueue);
        });

        //Start the first instruction.
        this.RunNextInstruction(gs, instructionQueue);

    }

    static RunNextInstruction(gs:GameScene, instructionQueue:Array<IInstruction>) { 
        if (instructionQueue.length > 0) {
            let instruction = instructionQueue.shift();
            instruction.start(gs);
            //Recursively call this if this instruction isnt' blocking.
            if(!instruction.blocking) {
                this.RunNextInstruction(gs, instructionQueue);
            }
        }
    }

    private static PrepQueue(scriptName:string, gs:GameScene, instructionQueue:Array<IInstruction>) {
        let script:string;
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
        //Queue up the instructions from the script i just loaded.
        //If there is an error or something i should log it.  
        
        let lines = script.split('\n');
        for (let l of lines) {
            let instruction:IInstruction;
            if(l[0] == '>') {
                let parts = l.trim().split(':');
                let command = parts[0];
                //Split apary the arguments.  
                let args = parts[1].split(',');

                //Remove the '>' from the command.
                command = command.substr(1);
                //Trim all the arguments.
                for (let i = 0; i < args.length; i++) {
                    args[i] = args[i].trim();
                }

                switch(command) {
                    case 'Place':
                        instruction = new insPlace(args[0], parseInt(args[1]), parseInt(args[2]), args[3]);
                        break;
                    case 'FadeIn':
                        console.log(`Found a fade in command`);
                        break;
                    case 'FadeOut':
                        console.log(`Found a fade out command`);
                        break;
                    case 'ChangeBackground':
                        console.log(`Found a change background command`);
                        break;
                    case 'Shake':
                        instruction = new insShake();
                        break;
                    case 'AddClue':
                        instruction = new insAddClue(args[0], args[1] as ClueType);
                        break;
                    default:
                        console.log(`Unrecognized command.  Typo?  ${command}`);
                        break;
                }
            }
            //Otherwise this is text that should be displayed.
            else {
                let parts = l.trim().split(':');
                instruction = new insSay(parts[0], parts[1]);
            }
            if (instruction != undefined) {
                instructionQueue.push(instruction);
            }
        }
    }
}