import { C } from "../C";
import { SceneEvents } from "../enums/SceneEvents";
import { GameScene } from "../scenes/GameScene";
import { ClueType } from "./objClue";
import { objMystery } from "./objMystery";

export class objAssumption {
    sprite: Phaser.GameObjects.NineSlice;
    g: Phaser.GameObjects.Graphics;
    c:Phaser.GameObjects.Container;
    gs:GameScene;
    description:string;
    words:Phaser.GameObjects.Text[] = []; 
    mysteries:objMystery[] = [];
    Correct:boolean = false;

    constructor(gs:GameScene, description:string) {
        this.gs = gs;
        this.description = description;
        this.c = gs.add.container(0,0);
        this.g = gs.add.graphics();
        this.g.fillStyle(0x000000);
        this.g.fillRect(0,0,C.AssumptionWidth,C.AssumptionHeight);
        this.c.add(this.g);
        this.gs.clueLayer.add(this.c);
        this.c.setPosition(300,100);
        let size=this.ParseText(description);
        this.sprite = gs.add.nineslice(0, 0, 'atlas', 'Box', C.AssumptionWidth,C.AssumptionHeight,4,4,4,4).setOrigin(0,0).setScale(4);
        this.c.add(this.sprite);

    }

    Activate() {
        this.gs.events.on(SceneEvents.MysteryCorrect, () => {
            let allCorrect = true;
            this.mysteries.forEach(mystery => {
                if(!mystery.correct)
                    allCorrect = false;
            });
            if(allCorrect) {
                this.sprite.setTint(0x00ffff);
                this.sprite.postFX.addShine();
                this.gs.events.emit(SceneEvents.AssumptionCorrect);
                this.Deactivate();
                this.Correct = true;
            }
        });

        this.mysteries.forEach(element => {
            element.Activate();
        });
    }

    Deactivate() {
        this.gs.events.removeListener(SceneEvents.MysteryCorrect);
        this.mysteries.forEach(element => {
            element.Deactivate();
        });
    }

    //I'm not quite sure how to do this.  I think we need to draw each word individually, and then position them based on the previous word's size.
    //This will let me position the answers in the correct spots
    ParseText(description:string):{width:number, height:number}{
        //Split by both spaces and ]
        let parts = description.split(" ");
        let x = C.AssumptionPadding;
        let y = C.AssumptionPadding;
        let allowedWidth = C.AssumptionWidth * 4 - (C.AssumptionPadding * 2);

        for (let index = 0; index < parts.length; index++) {
            if(parts[index][0] != '[') {
                const word = parts[index] + " ";
                let t = this.gs.add.text(0,0, word, { fontFamily: 'munro'}).setFontSize(C.AssumptionTextSize).setOrigin(0,0).setScale(1);
                this.c.add(t);
                let w = t.width;
                if(x + w > allowedWidth) {
                    x = C.AssumptionPadding;
                    y += t.height + 14;
                }
                t.setPosition(x,y);
                x += w;
            } else {
                C.Write("Create a mystery");
                //Drop the first and the last characters of the string
                let mystery = parts[index].substring(1, parts[index].length - 1).split(',');
                for (let i = 0; i < mystery.length; i++) {
                    mystery[i] = mystery[i].toLowerCase();
                }
                let m = new objMystery(this.gs, mystery[0] as ClueType, mystery.slice(1));
                this.c.add(m.sprite);
                this.c.add(m.text);
                let w = C.MysteryWidth;
                if(x + w > allowedWidth) {
                    x = C.AssumptionPadding;
                    y += C.AssumptionHeight + 14;
                }
                m.SetPosition(x,y);
                x += w + 10;
                this.mysteries.push(m);
            }
        }
        return {width:x, height:y};
    }
}