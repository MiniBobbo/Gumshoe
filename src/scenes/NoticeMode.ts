import { ScriptRunner } from "../helpers/ScriptRunner";
import { objNotice } from "../objects/objNotice";
import { GameScene } from "./GameScene";

export class NoticeMode {
    gs:GameScene;
    NoticeObjects:Array<objNotice> = [];

    constructor(gs:GameScene) {
        this.gs = gs;
    }

    AddNotice(name:string, script:string, x:number, y:number, w:number, h:number) {
        this.NoticeObjects.push(new objNotice(name, script, x, y, w, h, this.gs));
    }

    ClearNotices() {
        this.NoticeObjects.forEach(notice => {
            notice.sprite.destroy();
            notice.text.destroy();
        });
        this.NoticeObjects = [];
    }
}