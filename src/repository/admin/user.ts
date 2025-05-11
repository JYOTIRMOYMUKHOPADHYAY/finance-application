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
      email = CASE WHEN email <> ${data.email} THEN ${
        data.email
      } ELSE email END,
      phone_no = CASE WHEN phone_no <> ${data.phone_no} THEN ${
        data.phone_no
      } ELSE phone_no END,
      qualification = CASE WHEN email <> ${data?.qualification || null} THEN ${
        data?.qualification || null
      } ELSE qualification END,
      experience = CASE WHEN email <> ${data?.experience || null} THEN ${
        data?.experience || null
      } ELSE experience END,
      service_id = CASE WHEN email <> ${data?.service_id || null} THEN ${
        data?.service_id || null
      } ELSE service_id END,
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
      "isActive",
      qualification,
      experience,
      service_id
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
      const data = await sql`
        SELECT
          bsp.*,
          s.name AS service_name,
          s.id AS service_id,
          ss.name AS sub_service_name,
          ss.id AS sub_service_id,
          u.name AS user_name,
          u.email AS user_email,
          u.phone_no AS user_phone,
          COALESCE(CAST(msc.staff_id AS TEXT), 'NA') AS staff_id, -- Ensure it's text for 'NA'
          msc.created_date AS staff_mapping_created_date,
          COALESCE(staff.name, 'NA') AS staff_name
        FROM bris_sole_proprietorship bsp
        JOIN services s ON s.id = bsp.service_id
        JOIN subservices ss ON ss.id = bsp.sub_service_id
        JOIN userData u ON u.user_id = bsp.user_id
        LEFT JOIN mapstaffcustomer msc 
          ON bsp.user_id = msc.customer_id
          AND bsp.service_id = msc.service_id
        LEFT JOIN userData staff ON staff.user_id = msc.staff_id
        WHERE bsp.status <> 'PENDING';
      `;
  
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  

  //   public async getNewServicesSubmission(
  //     status: string = STATUS.PENDING
  //   ): Promise<any> {
  //     try {
  //       return await sql`

  //       SELECT
  //     bsp.*,
  //     s.name AS service_name,
  //     s.id AS service_id,
  //     ss.name AS sub_service_name,
  //     ss.id AS sub_service_id,
  //     u.name AS user_name,
  //     u.email AS user_email,
  //     u.phone_no AS user_phone
  // FROM bris_sole_proprietorship bsp
  // JOIN services s ON s.id = bsp.service_id
  // JOIN subservices ss ON ss.id = bsp.sub_service_id
  // JOIN userData u ON u.user_id = bsp.user_id
  // WHERE bsp.status = ${status}
  //       ORDER BY bsp.created_date DESC;

  // `;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }

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
        u.phone_no AS user_phone,
        COALESCE(CAST(msc.staff_id AS TEXT), 'NA') AS staff_id,  -- If a match is found, this will have a value; otherwise, NULL
        msc.created_date AS staff_mapping_created_date,
        COALESCE(staff.name, 'NA') AS staff_name -- Get staff name
      FROM bris_sole_proprietorship bsp
      JOIN services s ON s.id = bsp.service_id
      JOIN subservices ss ON ss.id = bsp.sub_service_id
      JOIN userData u ON u.user_id = bsp.user_id
     
      LEFT JOIN mapstaffcustomer msc 
        ON bsp.user_id = msc.customer_id  -- Ensures correct user
        AND bsp.service_id = msc.service_id  -- Ensures correct service match
        LEFT JOIN userData staff ON staff.user_id = msc.staff_id -- Join to get staff name
      WHERE bsp.status = ${status} 
      ORDER BY bsp.created_date DESC;
    `;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getstaffMappingDetails(customer_id: number): Promise<any> {
    try {
      return await sql`

      SELECT * from mapstaffcustomer where customer_id = ${customer_id}
`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // JOIN mapstaffcustomer msc ON bsp.user_id = msc.customer_id

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

  public async mapStaffUser(
    customer_id: number,
    staff_id: number,
    service_id: number,
    requestId: number,
    admin_id: number
  ): Promise<any> {
    try {
      await sql`
        INSERT INTO mapStaffCustomer (customer_id, staff_id, service_id)  
        VALUES (${customer_id}, ${staff_id}, ${service_id})
        ON CONFLICT (customer_id, service_id)  
        DO UPDATE SET staff_id = EXCLUDED.staff_id, created_date = CURRENT_TIMESTAMP
        RETURNING *;
      `;

      await sql`
        INSERT INTO assigned_staff_service_data (staff_id, sole_proprietorship_id, updated_by,updated_date)  
        VALUES (${staff_id}, ${requestId}, ${admin_id}, CURRENT_TIMESTAMP)
        RETURNING *;
      `;
      return await sql`
        UPDATE bris_sole_proprietorship 
        SET status = 'ASSIGNED' 
        WHERE id = ${requestId}
                RETURNING *;
      `;
    } catch (error) {
      console.error("Error inserting/updating mapStaffCustomer:", error);
      throw error;
    }
  }

  public async searchReports(
    status?: string,
    service_id?: number,
    staff_id?: number
  ): Promise<any> {
    try {
      const conditions: string[] = [];
      const params: any[] = [];
  
      if (status) {
        conditions.push(`bsp.status = $${params.length + 1}`);
        params.push(status);
      }
  
      if (service_id) {
        conditions.push(`bsp.service_id = $${params.length + 1}`);
        params.push(service_id);
      }
  
      if (staff_id) {
        conditions.push(`msc.staff_id = $${params.length + 1}`);
        params.push(staff_id);
      }
  
      const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  
      const query = `
        SELECT 
          bsp.*, 
          u.name AS user_name,
          u.phone_no AS user_phone,
          s.name AS service_name,
          ss.name AS sub_service_name,
          msc.staff_id,
          msc.created_date AS staff_mapping_created_date,
          staff.name AS staff_name -- Get staff name
        FROM bris_sole_proprietorship bsp
        JOIN services s ON s.id = bsp.service_id
        JOIN subservices ss ON ss.id = bsp.sub_service_id
        JOIN userData u ON u.user_id = bsp.user_id
        LEFT JOIN mapstaffcustomer msc 
          ON bsp.user_id = msc.customer_id 
          AND bsp.service_id = msc.service_id
          LEFT JOIN userData staff ON staff.user_id = msc.staff_id -- Join to get staff name
        ${whereClause};
      `;
  
      return await sql.unsafe(query, params);
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  }
  
  
}







