import sql from "../../config/db";
import { STATUS } from "../../globalVariable";

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
  public async getAllStaffDashboard(data: any): Promise<any> {
    const query = `
    SELECT
    bsp.*,
    s.name AS service_name,
    ss.name AS sub_service_name,
    ss.id AS sub_service_id,
    u.name AS user_name,
    u.email AS user_email,
    u.phone_no AS user_phone
FROM
    mapStaffCustomer msc
LEFT JOIN
    BRIS_sole_proprietorship bsp ON msc.customer_id = bsp.user_id
LEFT JOIN
    services s ON bsp.service_id = s.id
LEFT JOIN
    subservices ss ON bsp.sub_service_id = ss.id
LEFT JOIN 
    userData u ON u.user_id = bsp.user_id  -- Ensure every user is fetched
WHERE
    msc.staff_id = $1;
    `;

    try {
      const result = await sql.unsafe(query, [data]);
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  public async getStaffDashboard(data: any): Promise<any> {
    const query = `
    SELECT
    bsp.*,
    s.name AS service_name,
    ss.name AS sub_service_name,
    ss.id AS sub_service_id,
    u.name AS user_name,
    u.email AS user_email,
    u.phone_no AS user_phone
FROM
    mapStaffCustomer msc
LEFT JOIN
    BRIS_sole_proprietorship bsp ON msc.customer_id = bsp.user_id
LEFT JOIN
    services s ON bsp.service_id = s.id
LEFT JOIN
    subservices ss ON bsp.sub_service_id = ss.id
LEFT JOIN 
    userData u ON u.user_id = bsp.user_id
WHERE
    msc.staff_id = $1
    AND bsp.status = 'PENDING';

    `;

    try {
      const result = await sql.unsafe(query, [data]);
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  public async approveRejectServicesSubmission(
    isApproved: boolean | string,
    requestId: number
  ): Promise<any> {
    try {
      const status =
        isApproved == true || isApproved == "true"
          ? STATUS.APPROVED
          : STATUS.REJECTED;
      return await sql`
UPDATE bris_sole_proprietorship
SET status = ${status}::status_enum 
WHERE id = ${requestId}
RETURNING *;

`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async removeStaffCustomerMapping(
    customer_id: number,
    service_id: number
  ): Promise<any> {
    try {
      return await sql`
DELETE FROM mapStaffCustomer
WHERE customer_id = ${customer_id}
AND service_id = ${service_id}
`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
