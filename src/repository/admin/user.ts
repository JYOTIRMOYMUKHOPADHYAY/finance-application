import sql from "../../config/db";
import { STATUS, USERTYPE_ID } from "../../globalVariable";

export default class UserRepository {
  constructor() {}

  public async updateUser(data: any, admin?: any): Promise<any> {
    try {
      return await sql`
  UPDATE userData
  SET 
      name = CASE WHEN name <> ${data.name} THEN ${data.name} ELSE name END,
      email = CASE WHEN email <> ${data.email} THEN ${data.email} ELSE email END,
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
          ss.id AS sub_service_id
      FROM bris_sole_proprietorship bsp
      JOIN services s ON s.id = bsp.service_id
      JOIN subservices ss ON ss.id = bsp.sub_service_id
      WHERE bsp.status = ${status} 
      ORDER BY bsp.created_date DESC;
`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async approveRejectServicesSubmission(
    isApproved: boolean,
    requestId: number
  ): Promise<any> {
    try {
      console.log(isApproved);
      return await sql`
UPDATE bris_sole_proprietorship
SET status = CASE 
    WHEN ${isApproved} THEN ${STATUS.APPROVED}::status_enum 
    ELSE ${STATUS.REJECTED}::status_enum 
END
WHERE id = ${requestId}
RETURNING *;

`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
