import { insPlace } from "../instructions/insPlace";
import { IInstruction } from "../interfaces/IInstruction";
import { GameScene } from "../scenes/GameScene";
import { insSay } from "../instructions/insSay";
import { insShake } from "../instructions/insShake";
import { insAddClue } from "../instructions/insAddClue";
import { ClueType } from "../objects/objClue";
import { Script } from "vm";
import { insRunScript } from "../instructions/insRunScript";
import { insFlash } from "../instructions/insFlash";
import { insAddNotice } from "../instructions/insAddNotice";

export class ScriptRunner {
    private instructionQueue:Array<IInstruction> = [];
    gs:GameScene;
    constructor(gs:GameScene) {
        //Set uip the event listener for when the instruction is complete.
        this.gs = gs;
        gs.events.on('instructionComplete', () => {
            this.RunNextInstruction(gs, this.instructionQueue);
        });
        
    }
    RunScript(scriptName:string, gs:GameScene, insert:boolean = false) {
        let queue = this.PrepQueue(scriptName, gs);
        if(insert) {
            this.instructionQueue = queue.concat(this.instructionQueue);
        } else {
            this.instructionQueue = queue;
        }

        //Start the first instruction.
        this.RunNextInstruction(gs, this.instructionQueue);

    }

    RunNextInstruction(gs:GameScene, instructionQueue:Array<IInstruction>) { 
        if (instructionQueue!=null && instructionQueue.length > 0) {
            let instruction = instructionQueue.shift();
            instruction.start(gs);
            //Recursively call this if this instruction isnt' blocking.
            if(!instruction.blocking) {
                this.RunNextInstruction(gs, instructionQueue);
            }
        }
    }

    private PrepQueue(scriptName:string, gs:GameScene):Array<IInstruction> {
        let script:string;
        let queue:Array<IInstruction> = [];
        try {
            script = gs.cache.text.get(scriptName);
        } catch {
            console.log(`Can't fetch script ${scriptName}`);
            return;
        }

        //Apparently Phaser doesn't throw an error when you try to load something that doesn't exist...
        if (script == undefined) {
            console.log(`Script ${scriptName} is not loaded.`);
            return;
        }
        

        console.log(`Starting script ${scriptName}`);
        //Queue up the instructions from the script i just loaded.
        //If there is an error or something i should log it.  
        
        let lines = script.split('\n');
        for (let l of lines) {
            let instruction:IInstruction;
            //Commens start with -
            if (l[0] == '-') {
                continue;
            }
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
                        console.log(`Found a change background command: ${args[0]}`);
                        break;
                    case 'Shake':
                        instruction = new insShake();
                        break;
                    case 'AddClue':
                        instruction = new insAddClue(args[0], args[1] as ClueType);
                        break;
                    case 'RunScript':
                        console.log(`Found a run script command: ${args[0]}`);
                        //Maybe thre is a better way to convert a string to a boolean but I'm not sure what itis...
                        instruction = new insRunScript(args[0], args[1] == 'true');
                        break;
                    case 'Flash':
                        instruction = new insFlash();
                        break;
                    case 'AddNotice':
                        instruction = new insAddNotice(args[0], args[1], parseInt(args[2]), parseInt(args[3]), parseInt(args[4]), parseInt(args[5]));    
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
                queue.push(instruction);
            }
        }
        return queue;
    }
}