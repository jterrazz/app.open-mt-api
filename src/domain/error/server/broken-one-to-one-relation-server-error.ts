export class BrokenOneToOneRelationServerError {
    private relationName: string;
    constructor(relationName: string) {
        this.relationName = relationName;
    }
}
