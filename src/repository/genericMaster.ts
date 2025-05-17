import sql from "../config/db";

export default class GenericMasterRepository {
  constructor() {}


//   public async getComplianceData(id: number): Promise<any> {
//     try {
//       return await sql`
// SELECT * FROM ComplianceCalenderData WHERE compliance_date_id = ${id} ORDER BY date ASC
//       `;
//     } catch (error) {
//       throw error;
//     }
//   }

//   public async getLinksData(): Promise<any> {
//     try {
//       return await sql`
// SELECT * FROM externalLinks ORDER BY ID ASC;
//       `;
//     } catch (error) {
//       throw error;
//     }
//   }

//   public async newsUpdatesData(): Promise<any> {
//     try {
//       return await sql`
// SELECT * FROM newsUpdateData WHERE isDeleted = false ORDER BY CREATED_DATE DESC LIMIT 5;
//       `;
//     } catch (error) {
//       throw error;
//     }
//   }

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
