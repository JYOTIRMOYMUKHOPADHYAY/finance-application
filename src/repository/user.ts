import sql from "../config/db";

export default class UserRepository {
  constructor() {}

  /**
   * Get all user types.
   */
  public async createUser({
    name,
    email,
    phone_no,
    qualification,
    experience,
    service_id,
    userType_id,
    salt,
    hash,
    created_by,
  }: any): Promise<any> {
    try {
      return await sql`
        INSERT INTO userData (name, email, password, password_salt, phone_no,qualification, experience, service_id, userType_id, created_by, created_at, updated_by, updated_at)
      VALUES (${name}, ${email}, ${hash}, ${salt}, ${phone_no}, ${
        qualification || null
      }, ${experience || null}, ${service_id || null}, ${userType_id}, ${
        created_by || null
      }, NOW(), null, null)
      RETURNING *`;
    } catch (error) {
      throw error;
    }
  }

  public async login(mobile: string, password: string): Promise<any> {
    try {
      const query = `SELECT COUNT(*) as count 
                     FROM user 
                     WHERE phone_no = $1 AND password = $2`;

      return await sql`${query}, [
        mobile,
        password,
      ]`; // Returns true if user exists.
    } catch (error) {
      console.log(error);
      throw new Error("Failed to authenticate user.");
    }
  }

  public async getUser(mobile: string): Promise<any> {
    try {
      return await sql`
      SELECT * 
      FROM userData 
      WHERE phone_no = ${mobile}
    `;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(id: number): Promise<any> {
    try {
      return await sql`
      SELECT * 
      FROM userData 
      WHERE user_id = ${id}
    `;
    } catch (error) {
      throw error;
    }
  }

  public async updatePassword(
    mobile: string,
    password: string,
    salt: string
  ): Promise<any> {
    try {
      return await sql`
        UPDATE userData
        SET password = ${password},
            password_salt = ${salt},
            updated_at = CURRENT_TIMESTAMP
        WHERE phone_no = ${mobile}
        RETURNING *;
      `;
    } catch (error) {
      throw error;
    }
  }
}
