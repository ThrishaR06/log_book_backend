import { CategoryService } from "./category.service";
import { ApiResponse } from "../../utils/apiResponse";

export class CategoryController {

    static async create({ body, store }: any) {

    try {

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

    } catch (error: any) {

        console.error("CREATE CATEGORY ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to create category."
        );

    }

}

    static async getAll({ store }: any) {

    try {

        const data =
            await CategoryService.getCategories(
                store.user.id
            );

        return ApiResponse.success(data);

    } catch (error: any) {

        console.error("GET CATEGORIES ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to fetch categories."
        );

    }

}

    static async update({ params, body, store }: any) {

    try {

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

    } catch (error: any) {

        console.error("UPDATE CATEGORY ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to update category."
        );

    }

}

static async delete({ params, store }: any) {

    try {

        const data =
            await CategoryService.deleteCategory(
                Number(params.id),
                store.user.id
            );

        return {
            success: true,
            ...data,
        };

    } catch (error: any) {

        console.error("DELETE CATEGORY ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to delete category."
        );

    }

}

static async search({ query, store }: any) {

    try {

        const data =
            await CategoryService.searchCategories(
                store.user.id,
                query.keyword
            );

        return ApiResponse.success(
            data,
            "Categories fetched successfully."
        );

    } catch (error: any) {

        console.error("SEARCH CATEGORY ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to search categories."
        );

    }

}

}