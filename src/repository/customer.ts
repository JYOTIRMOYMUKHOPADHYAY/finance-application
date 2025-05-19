import sql from "../config/db";

export interface Customer {
  userId: number;
  serviceId: number;
  subServiceId: number;
  mobileNo: string;
  mailId: string;
  periodId: number;
  message: string;
  fileLink: string;
}

export default class CustomerRepository {
  constructor() {}

  public async serviceSubmission(data: Customer): Promise<any> {
    try {
      return await sql`
        INSERT INTO serviceRequest(
            user_id,service_id, sub_service_id, mobileNo, mailId, periodId, message, 
            fileLink
        ) 
        VALUES (
            ${Number(data.userId)},      
            ${Number(data.serviceId)},
            ${Number(data.subServiceId)},
            ${data.mobileNo},   
            ${data.mailId},    
            ${Number(data.periodId)},
            ${data.message},
            ${data.fileLink}  
        )
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
FROM serviceRequest bsp
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
}
