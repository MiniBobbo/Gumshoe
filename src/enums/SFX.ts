import { GameScene } from "../scenes/GameScene";

export class SFX {
    private static gs:GameScene;

    public static thump = "thump";
    public static flash = "flash";
    public static PlayerTalk = "PlayerTalk";
    public static click = "click";
    public static correct = "correct";
    public static ChaosTalk = "ChaosTalk";
    public static OrderTalk = "OrderTalk";

    public static MasterVolume:number = 1;
    public static SpeakingVolume:number = .05;

    public static setGameScene(gs:GameScene){
        this.gs = gs;
    }

    public static play(key:string, volumeMod:number = 1){
        if(this.gs){
            this.gs.sound.play(key, {volume:this.MasterVolume * volumeMod});
        }
    }

    public static say(name:string) {
        switch (name) {
            case 'Player':
                this.play(this.PlayerTalk,this.SpeakingVolume);
                break;
            case 'Chaos':
                this.play(this.ChaosTalk,this.SpeakingVolume);
                break;
            case 'Order':
                this.play(this.OrderTalk,this.SpeakingVolume);
                break;
                
            default:
                break;
        }
    }
}

