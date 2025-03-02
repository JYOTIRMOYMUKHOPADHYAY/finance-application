import sql from "../config/db";

export default class RegisterRepository {
  constructor() {}

  /**
   * Get all user types.
   */
  public async register({
    name,
    email,
    phone_no,
    qualification,
    experience,
    service_id,
    userType_id,
    salt,
    hash,
    created_by
  }: any): Promise<any> {
    try {
      return await sql`
        INSERT INTO userData (name, email, password, password_salt, phone_no,qualification, experience, service_id, userType_id, created_by, created_at, updated_by, updated_at)
      VALUES (${name}, ${email}, ${hash}, ${salt}, ${phone_no}, ${qualification || null}, ${experience || null}, ${service_id || null}, ${userType_id}, ${created_by || 1}, NOW(), 1, NOW())
      RETURNING *`;
    } catch (error) {
      throw error
    }
  }
}
