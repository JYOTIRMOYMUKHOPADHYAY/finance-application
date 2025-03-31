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
   WITH customer_service_mapping AS (
    SELECT 
        customer_id, 
        service_id 
    FROM 
        mapStaffCustomer 
    WHERE 
        staff_id = $1 -- Replace with actual staff_id
)
SELECT DISTINCT ON (bsp.id)
    bsp.*,
    s.name AS service_name,
    ss.name AS sub_service_name,
    ss.id AS sub_service_id,
    u.name AS user_name,
    u.email AS user_email,
    u.phone_no AS user_phone
FROM
    customer_service_mapping csm
JOIN
    BRIS_sole_proprietorship bsp 
    ON csm.customer_id = bsp.user_id 
    AND csm.service_id = bsp.service_id  -- Ensures only relevant service data
LEFT JOIN
    services s ON bsp.service_id = s.id
LEFT JOIN
    subservices ss ON bsp.sub_service_id = ss.id
LEFT JOIN 
    userData u ON u.user_id = bsp.user_id
WHERE
    bsp.status Not IN ('PENDING', 'ASSIGNED');
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
WITH customer_service_mapping AS (
    SELECT 
        customer_id, 
        service_id 
    FROM 
        mapStaffCustomer 
    WHERE 
        staff_id = $1 -- Replace with actual staff_id
)
SELECT DISTINCT ON (bsp.id)
    bsp.*,
    s.name AS service_name,
    ss.name AS sub_service_name,
    ss.id AS sub_service_id,
    u.name AS user_name,
    u.email AS user_email,
    u.phone_no AS user_phone
FROM
    customer_service_mapping csm
JOIN
    BRIS_sole_proprietorship bsp 
    ON csm.customer_id = bsp.user_id 
    AND csm.service_id = bsp.service_id  -- Ensures only relevant service data
LEFT JOIN
    services s ON bsp.service_id = s.id
LEFT JOIN
    subservices ss ON bsp.sub_service_id = ss.id
LEFT JOIN 
    userData u ON u.user_id = bsp.user_id
WHERE
    bsp.status IN ('PENDING', 'ASSIGNED');
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

  public async checkUserStaffMapping(
    user_id: number,
    staff_id: number
  ): Promise<any> {
    try {
      return await sql`
SELECT * FROM mapStaffCustomer WHERE staff_id = ${staff_id} AND customer_id = ${user_id};
`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getRequestDetails(
    reqId: number
  ): Promise<any> {
    try {
      return await sql`
SELECT * FROM bris_sole_proprietorship WHERE id = ${reqId};
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
