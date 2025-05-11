import sql from "../config/db";

export default class ServicesRepository {
  constructor() {}


  /**
   * Fetches all services.
   * @returns A promise that resolves to an array of services.
   * @throws An error if the database query fails.
   */
  public async getAllServices(): Promise<any> {
    try {
      return await sql`
       SELECT * FROM services`;
    } catch (error) {
      throw error
    }
  }

  /**
   * Fetches all sub-services associated with a given service ID.
   * @param id - The ID of the service to fetch sub-services for.
   * @returns A promise that resolves to an array of sub-services.
   * @throws An error if the database query fails.
   */

  public async getSubServices(id: number): Promise<any> {
    try {
      return await sql`
       SELECT 
    s.id, 
    s.name, 
    s.service_id, 
    s.role_name,
    s.periodid,
    s.documents_required,
    gmd.name AS period_name
FROM subservices s
LEFT JOIN genericMasterDropdown gmd ON s.periodId = gmd.id
WHERE s.service_id = ${id} ORDER BY s.id;
`;
    } catch (error) {
      throw error
    }
  }
}
