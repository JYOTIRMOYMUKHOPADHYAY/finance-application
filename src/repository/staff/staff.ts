import sql from "../../config/db";

interface applyJob {
  name: string;
  email: string;
  phone_no: string;
  experience: string;
  current_location: string;
  user_type: number;
  agreement: boolean;
  status: boolean;
  filePath: string;
}

export default class StaffRepository {
  constructor() {}

  /**
   * Get user details by mobile number.
   */
  public async getStaffDashboard(data: any): Promise<any> {
      const query = `
     SELECT
      bsp.*,
      s.name AS service_name,
      ss.name AS sub_service_name
    FROM
      mapStaffCustomer msc
    JOIN
      BRIS_sole_proprietorship bsp ON msc.customer_id = bsp.user_id
    JOIN
      services s ON bsp.service_id = s.id
    JOIN
      subservices ss ON bsp.sub_service_id = ss.id
    WHERE
      msc.staff_id = $1;
    `;
  
    try {
      const result = await sql.unsafe(query, [data]);
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
    
  }

  // async function getStaffDashboard(staffId) {
    
  // }
}
