import sql from "../config/db";

export interface UserType {
  userType_id: number;
  userType_name: string;
}

export default class GeneralRepository {
  constructor() {}
  public async getUserTypes(): Promise<any> {
    try {
      return await sql`SELECT * FROM userTypes`;
    } catch (error) {
      throw error;
    }
  }

  public async getLinksData(): Promise<any> {
    try {
      return await sql`
SELECT * FROM externalLinks ORDER BY ID ASC;
      `;
    } catch (error) {
      throw error;
    }
  }

  public async newsUpdatesData(): Promise<any> {
    try {
      return await sql`
SELECT * FROM newsUpdateData WHERE isDeleted = false ORDER BY CREATED_DATE DESC LIMIT 5;
      `;
    } catch (error) {
      throw error;
    }
  }

  public async getAllServices(): Promise<any> {
    try {
      return await sql`
       SELECT * FROM services`;
    } catch (error) {
      throw error;
    }
  }

  public async getSubServices(id: number): Promise<any> {
    try {
      return await sql`
       SELECT 
    s.id, 
    s.name, 
    s.service_id, 
    s.role_name,
    s.periodid,
    s.documents_required,
    gmd.name AS period_name
FROM subservices s
LEFT JOIN genericMasterDropdown gmd ON s.periodId = gmd.id
WHERE s.service_id = ${id} ORDER BY s.id;
`;
    } catch (error) {
      throw error;
    }
  }

  public async getPeriodIdData(): Promise<any> {
    try {
      return await sql`
    SELECT 
    gm.id AS master_id,
    gm.name AS master_name,
    COALESCE(json_agg(
        jsonb_build_object('id', gmd.id, 'name', gmd.name)
    ) FILTER (WHERE gmd.id IS NOT NULL), '[]') AS data
    FROM genericMaster gm
    LEFT JOIN genericMasterDropdown gmd ON gm.id = gmd.master_id
    GROUP BY gm.id, gm.name;
      `;
    } catch (error) {
      throw error;
    }
  }

  public async getMounthData(): Promise<any> {
    try {
      return await sql`
SELECT * FROM ComplianceCalenderTimeline ORDER BY id ASC
      `;
    } catch (error) {
      throw error;
    }
  }

  public async getComplianceData(id: number): Promise<any> {
    try {
      return await sql`
SELECT * FROM ComplianceCalenderData WHERE compliance_date_id = ${id} ORDER BY date ASC
      `;
    } catch (error) {
      throw error;
    }
  }

    public async applyForJob(data: any): Promise<any> {
      console.log(data)
    try {
      return await sql`
      INSERT INTO applyToJob (
        name, email, phone_no, experience, current_location, user_type, agreement,status, filePath
) 
VALUES (
    ${data.name}, --string
    ${data.email},  -- string 
    ${data.phone_no}, -- string
    ${data.experience}, -- string
    ${data.current_location}, -- string
    ${data.user_type}, -- number
    ${data.agreement}, --boolean
    ${data.status}, --string
    ${data.filePath} -- string
);
    `;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

    public async getInTouch(data: any): Promise<any> {
    try {
      return await sql`
      INSERT INTO getInTouch (
        name, phone_no, email, required_service, message
) 
VALUES (
    ${data.name}, --string
    ${data.phone_no},  -- string 
    ${data.email}, -- string
    ${Number(data.required_service)}, -- number
    ${data.message} -- string
);
    `;
    } catch (error) {
      throw error;
    }
  }
}
