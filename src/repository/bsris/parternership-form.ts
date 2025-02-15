import sql from "../../config/db";

export enum StatusEnum {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export interface BRISpartnershipFormship {
  userId: number;
  subServiceId: string;
  partnershipForm: string;
  partnershipDeed: string;
  affidavitConfirmingCopy: string;
  partnerPanCard: string;
  partnerAddressProof: string;
  ownershipDocument: string;
  businessAddressProof: string;
  firmName: string;
  businessType: string;
  dataOfEstablishment: Date;
  placeOfBusiness: string;
  ownershipType: string;
}

export default class BRISParternershipFormRepository {
  constructor() {}
  public async parternershipForm(data: BRISpartnershipFormship): Promise<any> {
    try {
      return await sql`
      INSERT INTO BRIS_parternership_form (
          user_id, sub_service_id, firm_name, business_type, data_of_establishment, 
          place_of_business, partnership_form, partnership_deed, affidavit_confirming_copy, 
          partner_pan_card, partner_address_proof, ownership_type, ownership_document, 
          business_address_proof
      ) 
      VALUES (
          ${data.userId},              -- number
          ${data.subServiceId},        -- number
          ${data.firmName},            -- string
          ${data.businessType},        -- string
          ${data.dataOfEstablishment}, -- Date
          ${data.placeOfBusiness},     -- string
          ${data.partnershipForm},     -- string
          ${data.partnershipDeed},     -- string
          ${data.affidavitConfirmingCopy}, -- string
          ${data.partnerPanCard},      -- string
          ${data.partnerAddressProof}, -- string
          ${data.ownershipType},       -- string
          ${data.ownershipDocument},   -- string
          ${data.businessAddressProof} -- string
      )
      RETURNING *;
  `;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
