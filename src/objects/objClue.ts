import { C } from "../C";
import { SceneEvents } from "../enums/SceneEvents";
import { GameScene } from "../scenes/GameScene";

export class objClue {
    Checked:boolean = false;
    Name:string;
    type:ClueType;
    x:number;
    Y:number;
    text:Phaser.GameObjects.Text;
    gs:GameScene;
    color:number = 0xffffff;

    constructor(name:string,type:ClueType, gs:GameScene) {
        this.Name = name;
        this.text = gs.add.text(0,0, name, { fontFamily: 'munro'}).setFontSize(6*4).setWordWrapWidth(20).setStroke('black', 4).setAlign('center').setInteractive();
        gs.clueLayer.add(this.text);
        this.gs = gs;
        this.color = this.getColor(type);
        this.text.setTint(this.color);
        this.type = type;
        
    }

    Activate() {

        this.text.on('pointerdown', (pointer, localx, localy, event:Phaser.Types.Input.EventData) => {
            C.Write(`Clicked ${this.Name}`);
            event.stopPropagation();
            this.gs.events.emit(SceneEvents.CluePressed, {name:this.Name,type:this.type});

        });
    }

    Deactivate() {
        this.text.removeListener('pointerdown');
    }

    SetPosition(x:number, y:number) {
        // this.sprite.x = x;
        // this.sprite.y = y;
        this.text.x = x + 12;
        this.text.y = y + 8;
    }

    getColor(type: ClueType): number {
        switch (type) {
            case ClueType.Object:
                return 0x00ff00;
            case ClueType.Verb:
                return 0xff0000;
            case ClueType.Location:
                return 0x0000ff;
            case ClueType.Person:
                return 0xffff00;
        }
    }
    
}


export enum ClueType {
    Object = 'object',
    Verb = 'verb',
    Location = 'location',
    Person = 'person',
    None = 'None'
}

