import { PositionService } from "./position.service";

export class PositionController {

  private service =
    new PositionService();

  async create(body: any) {
    try {

        return await this.service.create(body);

    } catch (error: any) {

        return {
            success: false,
            message: error.message
        };

    }
}

  getAll(doctorId: number) { try{
    return this.service.getAll(
      doctorId
    );
  }catch (error: any) {

        return {
            success: false,
            message: error.message
        };

    }
}

 getById(
    id: number,
    doctorId: number
) {
    try {

        return this.service.getById(
            id,
            doctorId
        );

    } catch (error: any) {

        return {
            success: false,
            message: error.message
        };

    }
}

update(
    id: number,
    body: any
) {
    try {

        return this.service.update(
            id,
            body
        );

    } catch (error: any) {

        return {
            success: false,
            message: error.message
        };

    }
}

delete(
    id: number,
    doctorId: number
) {
    try {

        return this.service.delete(
            id,
            doctorId
        );

    } catch (error: any) {

        return {
            success: false,
            message: error.message
        };

    }
}

search(
    doctorId: number,
    keyword: string
) {
    try {

        return this.service.search(
            doctorId,
            keyword
        );

    } catch (error: any) {

        return {
            success: false,
            message: error.message
        };

    }
}

list(
    doctorId: number,
    categoryId: number
) {
    try {

        return this.service.list(
            doctorId,
            categoryId
        );

    } catch (error: any) {

        return {
            success: false,
            message: error.message
        };

    }
}
}