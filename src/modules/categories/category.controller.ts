import { CategoryService } from "./category.service";
import { ApiResponse } from "../../utils/apiResponse";

export class CategoryController {

    static async create({ body, store }: any) {

        if (!body.name) {
            return ApiResponse.error("Category name is required");
        }

        const data =
            await CategoryService.createCategory(
                store.user.id,
                body.name
            );

        return ApiResponse.success(
    data,
    "Category created successfully"
);
    }

    static async getAll({ store }: any) {

        const data =
            await CategoryService.getCategories(
                store.user.id
            );

        return ApiResponse.success(data);
    }

    static async update({ params, body, store }: any) {

   if (!body.name) {
    return ApiResponse.error("Category name is required");
}

    const data =
        await CategoryService.updateCategory(
            Number(params.id),
            store.user.id,
            body.name
        );

    return ApiResponse.success(
    data,
    "Category updated successfully"
);
}

static async delete({ params, store }: any) {

    const data =
        await CategoryService.deleteCategory(
            Number(params.id),
            store.user.id
        );

    return {
        success: true,
        ...data,
    };
}

}