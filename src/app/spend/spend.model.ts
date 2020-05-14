export class SpendModel {
    constructor(
        public id: string,
        public amount: number,
        public date: Date,
        public month: string
    ){}
}