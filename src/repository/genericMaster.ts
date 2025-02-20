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
}
