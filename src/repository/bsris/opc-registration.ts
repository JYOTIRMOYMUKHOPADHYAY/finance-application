import sql from "../../config/db";

export enum StatusEnum {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export interface BRISopcRegistrationDetails {
  userId: number;
  subServiceId: string;
  addressProof: string;
  identityProof: string;
  noc: string;
  registeredOfficeProof: string;
  photograph: string;
  aoa: string;
  moa: string;
  directorPanCard: string;
}

export default class BRISopcRegistrationDetailsRepository {
  constructor() {}
  public async opcRegistration(data: BRISopcRegistrationDetails): Promise<any> {
    try {
      return await sql`
      INSERT INTO BRIS_opc_registration (
          user_id, sub_service_id, address_proof, businidentity_proofess_type, noc, 
          registered_office_proof, photograph, aoa, moa, 
          director_pan_card
      ) 
      VALUES (
          ${data.userId},
          ${data.subServiceId},
          ${data.addressProof},
          ${data.identityProof},    
          ${data.noc},
          ${data.registeredOfficeProof},    
          ${data.photograph},    
          ${data.aoa},    
          ${data.moa},
          ${data.directorPanCard}
      )
      RETURNING *;
  `;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
