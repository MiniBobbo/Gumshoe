import { C } from "../C";
import { GameScene } from "../scenes/GameScene";

export class objAssumption {
    sprite: Phaser.GameObjects.NineSlice;
    g: Phaser.GameObjects.Graphics;
    c:Phaser.GameObjects.Container;
    gs:GameScene;
    description:string;
    words:Phaser.GameObjects.Text[] = []; 
    constructor(gs:GameScene, description:string) {
        this.gs = gs;
        this.description = description;
        this.c = gs.add.container(0,0);
        this.g = gs.add.graphics();
        this.g.fillStyle(0x000000);
        this.g.fillRect(0,0,C.AssumptionWidth,C.AssumptionHeight);
        this.c.add(this.g);
        this.sprite = gs.add.nineslice(0, 0, 'atlas', 'Box', C.AssumptionWidth,C.AssumptionHeight,4,4,4,4).setOrigin(0,0).setScale(4);
        this.c.add(this.sprite);
        this.gs.clueLayer.add(this.c);
        this.c.setPosition(300,100);
        this.ParseText(description);

    }

    //I'm not quite sure how to do this.  I think we need to draw each word individually, and then position them based on the previous word's size.
    //This will let me position the answers in the correct spots
    ParseText(description:string) {
        let parts = description.split(" ");
        let x = C.AssumptionPadding;
        let y = C.AssumptionPadding;
        let allowedWidth = C.AssumptionWidth - (C.AssumptionPadding * 2);

        for (let index = 0; index < parts.length; index++) {
            const word = parts[index] + " ";
            let t = this.gs.add.text(0,0, word, { fontFamily: 'munro'}).setFontSize(C.AssumptionTextSize).setOrigin(0,0);
            this.c.add(t);
            let w = t.width;
            if(x + w > allowedWidth) {
                x = C.AssumptionPadding;
                y += t.height;
            }
            t.setPosition(x,y);
            x += w;
        }
    }
}