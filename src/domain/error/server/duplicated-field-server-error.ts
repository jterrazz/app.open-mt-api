export class DuplicatedFieldServerError {
    field: string;

    constructor(field: string) {
        this.field = field;
    }
}
