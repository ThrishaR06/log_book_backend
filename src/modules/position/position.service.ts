import { PositionRepository } from "./position.repository";

export class PositionService {

  private repository =
    new PositionRepository();

  async create(data: any) {

    const id =
      await this.repository.create(data);

    return {
      success: true,
      message: "Position created successfully",
      data: { id }
    };
  }

  async getAll(doctorId: number) {

    return {
      success: true,
      message: "Position fetched successfully",
      data: await this.repository.findAll(
        doctorId
      )
    };
  }

  async getById(id: number) {

    return {
      success: true,
      message: "Position fetched successfully",
      data: await this.repository.findById(id)
    };
  }

  async update(id: number, data: any) {

    await this.repository.update(
      id,
      data
    );

    return {
      success: true,
      message: "Position updated successfully"
    };
  }

  async delete(id: number) {

    await this.repository.delete(id);

    return {
      success: true,
      message: "Position deleted successfully"
    };
  }

  async search(
    doctorId: number,
    keyword: string
  ) {

    return {
      success: true,
      message: "Position search completed",
      data: await this.repository.search(
        doctorId,
        keyword
      )
    };
  }

  async list(
 doctorId:number,
 categoryId:number
){

 const data =
 await this.repository.list(
   doctorId,
   categoryId
 );

 return {
   success:true,
   message:"Positions fetched successfully",
   data
 };
}
}