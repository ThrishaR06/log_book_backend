import { db } from "../../db";
import { masterCategories } from "../../db/schema/masterCategories";

export class MasterCategoryService {

    static async getAll() {
        return await db
            .select()
            .from(masterCategories);
    }
}