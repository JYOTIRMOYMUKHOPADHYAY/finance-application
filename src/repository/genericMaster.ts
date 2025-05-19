import sql from "../config/db";

export default class GenericMasterRepository {
  constructor() {}



  public async getCarriersData(): Promise<any> {
    try {
      return await sql`
SELECT * FROM applytojob ORDER BY id DESC;
      `;
    } catch (error) {
      throw error;
    }
  }
}
