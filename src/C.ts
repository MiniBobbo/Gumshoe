import { objCurrentState } from "./objects/objCurrentState";

export class C {

    static MOUSE_SENSITIVITY:number = .8;
    static currentState:objCurrentState;
    static GAME_NAME:string = "AvatarOfJustice";
    static ClueWidth:number = 50;
    static ClueHeight:number = 12;
    static CluePadding:number = 6;
    static AssumptionWidth:number = 40 *4;
    static AssumptionHeight:number = 10 *4;
    static AssumptionPadding:number = 6 *4;
    static AssumptionTextSize:number = 6 *4;
    static MysteryWidth:number = 50 * 4;

    static LetterDelay:number = 40;
    static DEBUG:boolean = true;

    static Write(message:string) {
        if(C.DEBUG)
            console.log(message);
    }

}