import sql from "../../config/db";
import { STATUS } from "../../globalVariable";

export default class UserRepository {
  constructor() {}

  public async updateUser(data: any, admin?: any): Promise<any> {
    try {
      return await sql`
  UPDATE userData
  SET 
      name = CASE WHEN name <> ${data.name} THEN ${data.name} ELSE name END,
      email = CASE WHEN email <> ${data.email} THEN ${data.email} ELSE email END,
      qualification = CASE WHEN email <> ${data?.qualification || null} THEN ${data?.qualification || null} ELSE qualification END,
      experience = CASE WHEN email <> ${data?.experience || null} THEN ${data?.experience || null} ELSE experience END,
      service_id = CASE WHEN email <> ${data?.service_id || null} THEN ${data?.service_id || null} ELSE service_id END,
      updated_by = ${admin},
      updated_at = NOW()
  WHERE user_id = ${data.staff_id}
  RETURNING *;
`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async geteUser(userType: number): Promise<any> {
    try {
      return await sql`
  SELECT 
      user_id,
      name,
      email,
      phone_no,
      usertype_id,
      created_by,
      created_at,
      updated_by,
      updated_at,
      "isDeleted",
      "isActive"
  FROM userData WHERE userType_id = ${userType};
`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getAllServicesSubmission(
    status: string = STATUS.PENDING
  ): Promise<any> {
    try {
      return await sql`
SELECT
bsp.*,
          s.name AS service_name,
          s.id AS service_id,
          ss.name AS sub_service_name,
          ss.id AS sub_service_id
      FROM bris_sole_proprietorship bsp
      JOIN services s ON s.id = bsp.service_id
      JOIN subservices ss ON ss.id = bsp.sub_service_id;
`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getNewServicesSubmission(
    status: string = STATUS.PENDING
  ): Promise<any> {
    try {
      return await sql`

      SELECT
    bsp.*,
    s.name AS service_name,
    s.id AS service_id,
    ss.name AS sub_service_name,
    ss.id AS sub_service_id,
    u.name AS user_name,
    u.email AS user_email,
    u.phone_no AS user_phone
FROM bris_sole_proprietorship bsp
JOIN services s ON s.id = bsp.service_id
JOIN subservices ss ON ss.id = bsp.sub_service_id
JOIN userData u ON u.user_id = bsp.user_id
WHERE bsp.status = ${status} 
      ORDER BY bsp.created_date DESC;

`;
    } catch (error) {
      console.log(error);
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
          ? STATUS.COMPLETED
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

  public async getServicesSubmisson(user_id: number): Promise<any> {
    try {
      return await sql`
      SELECT
    bsp.*,
    s.name AS service_name,
    s.id AS service_id,
    ss.name AS sub_service_name,
    ss.id AS sub_service_id,
    u.name AS user_name,
    u.email AS user_email,
    u.phone_no AS user_phone
FROM bris_sole_proprietorship bsp
JOIN services s ON s.id = bsp.service_id
JOIN subservices ss ON ss.id = bsp.sub_service_id
JOIN userData u ON u.user_id = bsp.user_id
WHERE bsp.user_id = ${user_id} 
      ORDER BY bsp.created_date DESC;

`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async mapStaffUser(customer_id: number, staff_id: number, service_id: number): Promise<any> {
    try {
      return await sql`
        INSERT INTO mapStaffCustomer (customer_id, staff_id, service_id)  
        VALUES (${customer_id}, ${staff_id}, ${service_id})
        ON CONFLICT (customer_id, service_id)  
        DO UPDATE SET staff_id = EXCLUDED.staff_id, created_date = CURRENT_TIMESTAMP
        RETURNING *;
      `;
    } catch (error) {
      console.error("Error inserting/updating mapStaffCustomer:", error);
      throw error;
    }
  }
}
