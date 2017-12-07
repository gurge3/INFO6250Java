import { Category } from "../category/category.model";

export class Idea {

    constructor(public ideaId: number,
        public ideaName: string,
        public fundingAmount: number,
        public ideaCreatorName: string,
        public category: Category,
        public disabled: boolean,
        public disableReason: string) {
    }

}
