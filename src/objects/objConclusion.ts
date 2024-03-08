import { GameScene } from "../scenes/GameScene";

export class objConclusion {
    ID:string;
    gs:GameScene;
    sprite:Phaser.GameObjects.NineSlice;
    text:Phaser.GameObjects.Text;
    c:Phaser.GameObjects.Container;

    constructor(gs:GameScene, ID:string, text:string) {
        this.gs = gs;
        this.ID = ID;
        this.sprite = gs.add.nineslice(0, 0, 'atlas', 'AnswerBox', 50,12,4,4,4,4)
        .setOrigin(0,0).setScale(2).setInteractive().setTint(0x0000aa).setDepth(1);
        this.text = gs.add.text(6, 6, text, { fontFamily: 'munro'}).setFontSize(16).setWordWrapWidth(190).setOrigin(0,0).setDepth(2);
        this.c = gs.add.container(0,0,[this.sprite, this.text]);
        this.gs.clueLayer.add(this.c);  
    }

    SetPosition(x:number, y:number) {
        this.sprite.x = x;
        this.sprite.y = y -2;
        this.text.x = x + 6;
        this.text.y = y + 0;
    }

}