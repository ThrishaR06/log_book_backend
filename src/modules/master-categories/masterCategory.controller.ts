import { MasterCategoryService } from "./masterCategory.service";

export class MasterCategoryController {

    static async getAll() {
        return await MasterCategoryService.getAll();
    }
}