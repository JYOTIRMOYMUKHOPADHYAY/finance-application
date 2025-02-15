import sql from "../../config/db";

export enum StatusEnum {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export interface BRISSoleProprietorship {
  id: number;
  userId: number;
  subServiceId: number;
  aadharCard: string;
  panCard: string;
  idCard: string;
  bankPassbookPage: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  addressProof: string;
  rentalAgreement?: string; // Optional
  noc?: string; // Optional
  bills?: string; // Optional
  tradeLicense?: string; // Optional
  gstNumber: string;
  gstCertificate: string;
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

export default class BRISSoleProprietorshipRepository {
  constructor() {}

  public async soleProprietorship(data: BRISSoleProprietorship): Promise<any> {
    try {
      return await sql`
        INSERT INTO BRIS_sole_proprietorship (
            user_id, sub_service_id, aadhar_card, pan_card, id_card, bank_passbook_page, 
            account_number, ifsc_code, bank_name, address_proof, rental_agreement, 
            noc, bills, trade_license, gst_number, gst_certificate
        ) 
        VALUES (
            ${data.userId},         -- number
            ${data.subServiceId},   -- number
            ${data.aadharCard},     -- string
            ${data.panCard},        -- string
            ${data.idCard},         -- string
            ${data.bankPassbookPage}, -- string
            ${data.accountNumber},  -- string
            ${data.ifscCode},       -- string
            ${data.bankName},       -- string
            ${data.addressProof},   -- string
            ${data.rentalAgreement || null},  -- string (optional)
            ${data.noc || null},    -- string (optional)
            ${data.bills || null},  -- string (optional)
            ${data.tradeLicense || null}, -- string (optional)
            ${data.gstNumber},      -- string
            ${data.gstCertificate} -- string
        )
        RETURNING *;
    `;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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
