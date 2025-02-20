import sql from "../../config/db";

export enum StatusEnum {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export interface BRISSoleProprietorship {
  userId: number;
  serviceId: number;
  subServiceId: number;
  mobileNo: string;
  mailId: string;
  periodId: number;
  message: string;
  fileLink: string;
}

export default class BRISSoleProprietorshipRepository {
  constructor() {}

  public async soleProprietorship(data: BRISSoleProprietorship): Promise<any> {
    try {
      return await sql`
        INSERT INTO BRIS_sole_proprietorship (
            user_id,service_id, sub_service_id, mobileNo, mailId, periodId, message, 
            fileLink
        ) 
        VALUES (
            ${data.userId},      
            ${data.serviceId},
            ${data.subServiceId},
            ${data.mobileNo},   
            ${data.mailId},    
            ${data.periodId},
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
}
