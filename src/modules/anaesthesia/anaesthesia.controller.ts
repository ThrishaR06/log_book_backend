import { AnaesthesiaService } from "./anaesthesia.service";

export class AnaesthesiaController {
  private service = new AnaesthesiaService();

  async create(body: any) {

    try {

        return await this.service.create(body);

    } catch (error: any) {

        console.error("CREATE ANAESTHESIA ERROR =", error);

        return {
            success: false,
            message: error.message || "Failed to create anaesthesia",
            data: null
        };

    }

}

  async getAll(doctorId: number) {

    try {

        return await this.service.getAll(doctorId);

    } catch (error: any) {

        console.error("GET ALL ANAESTHESIA ERROR =", error);

        return {
            success: false,
            message: error.message || "Failed to fetch anaesthesia",
            data: null
        };

    }

}

  async getById(id: number) {

    try {

        return await this.service.getById(id);

    } catch (error: any) {

        console.error("GET ANAESTHESIA BY ID ERROR =", error);

        return {
            success: false,
            message: error.message || "Failed to fetch anaesthesia",
            data: null
        };

    }

}

  async update(id: number, body: any) {

    try {

        return await this.service.update(id, body);

    } catch (error: any) {

        console.error("UPDATE ANAESTHESIA ERROR =", error);

        return {
            success: false,
            message: error.message || "Failed to update anaesthesia",
            data: null
        };

    }

}

  async delete(id: number) {

    try {

        return await this.service.delete(id);

    } catch (error: any) {

        console.error("DELETE ANAESTHESIA ERROR =", error);

        return {
            success: false,
            message: error.message || "Failed to delete anaesthesia",
            data: null
        };

    }

}

  async search(doctorId: number, keyword: string) {

    try {

        return await this.service.search(
            doctorId,
            keyword
        );

    } catch (error: any) {

        console.error("SEARCH ANAESTHESIA ERROR =", error);

        return {
            success: false,
            message: error.message || "Failed to search anaesthesia",
            data: null
        };

    }

}
}