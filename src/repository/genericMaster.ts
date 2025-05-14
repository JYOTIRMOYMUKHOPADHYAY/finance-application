import sql from "../config/db";

export default class GenericMasterRepository {
  constructor() {}

  public async getDropdownData(): Promise<any> {
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
SELECT * FROM ComplianceCalender ORDER BY id ASC
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
SELECT * FROM newsUpdateData WHERE isDeleted = false ORDER BY CREATED_DATE DESC LIMIT 3;
      `;
    } catch (error) {
      throw error;
    }
  }

  public async getCarriersData(): Promise<any> {
    try {
      return await sql`
SELECT * FROM applytojob ORDER BY id DESC;
      `;
    } catch (error) {
      throw error;
    }
  }
}
