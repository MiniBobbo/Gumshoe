import { GameScene } from "../scenes/GameScene";

export class objNotice {
    Checked:boolean = false;
    Name:string;
    Script:string;
    x:number;
    Y:number;
    W:number;
    H:number;
    sprite:Phaser.GameObjects.NineSlice;
    text:Phaser.GameObjects.Text;

    constructor(name:string, script:string, x:number, y:number, w:number, h:number, gs:GameScene) {
        this.Name = name;
        this.Script = script;
        this.x = x;
        this.Y = y;
        this.W = w;
        this.H = h;
        this.sprite = gs.add.nineslice(x*4, y*4, 'atlas', 'Box', w,h,4,4,4,4).setOrigin(0,0).setScale(4);
        this.text = gs.add.text((x)*4, (y-4)*4, name, { fontFamily: 'munro'}).setFontSize(6*4).setStroke('black', 4);
        gs.hudLayer.add(this.sprite);
        gs.hudLayer.add(this.text);
    }
}