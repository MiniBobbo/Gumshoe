import { SceneEvents } from "../enums/SceneEvents";
import { ScriptRunner } from "../helpers/ScriptRunner";
import { objNotice } from "../objects/objNotice";
import { GameScene } from "./GameScene";

export class NoticeMode {
    gs:GameScene;
    NoticeObjects:Array<objNotice> = [];
    active:boolean = false;
    nextScript:string;

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

    StartNoticeMode(nextScript:string){
        this.active = true;
        this.gs.hudLayer.setVisible(true);
        this.nextScript = nextScript;

        this.NoticeObjects.forEach(element => {
            element.Activate();
        });
        this.gs.events.on(SceneEvents.StartScript, (scriptName:string) => {
            this.NoticeObjects.forEach(element => {
                element.Deactivate();
            });
        });

        this.gs.events.on(SceneEvents.FinishedScript, () => {
            this.NoticeObjects.forEach(element => {
                element.Activate();
            });
        });
    }

    EndNoticeMode(){    
        this.active = false;
        this.gs.hudLayer.setVisible(false);
        this.ClearNotices();
        this.gs.sr.RunScript(this.nextScript, this.gs);
    }
}