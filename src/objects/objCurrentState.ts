export class objCurrentState {
    Area:string;
    private Flags:Map<string, boolean>;


    constructor() {
        this.Area = "Main";
        this.Flags = new Map<string, boolean>();
    }

    setFlag(flag:string, value:boolean) {
        this.Flags.set(flag, value);
    }
    
    getFlag(flag:string):boolean {
        return this.Flags.get(flag);
    }

}