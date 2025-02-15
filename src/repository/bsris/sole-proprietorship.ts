import sql from "../../config/db";

export enum StatusEnum {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export interface BRISSoleProprietorship {
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
  rentalAgreement?: string | null; // Optional
  noc?: string | null; // Optional
  bills?: string | null; // Optional
  tradeLicense?: string | null; // Optional
  gstNumber: string;
  gstCertificate: string;
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

}
