export class objClue {
    type: ClueType;
    name: string;



    constructor( name: string, type: ClueType) {
        this.name = name;
        this.type = type;
    }



}

export enum ClueType {
    Object = 'object',
    Verb = 'verb',
    Location = 'location',
    Person = 'person',
}