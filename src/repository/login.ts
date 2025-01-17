import sql from "../config/db";
import Database from "../config/db";

export interface User {
  id: number;
  name: string;
  email: string;
  phone_no: string;
  userType_id: number;
}

export interface UserType {
  userType_id: number;
  userType_name: string;
}

export default class LoginRepository {
  constructor() {}

    /**
   * Get all user types.
   */
    public async getUserTypes(): Promise<any> {
      try {
        return await sql`SELECT * FROM userTypes`;
      } catch (error) {
        throw error;
      }
    }




  /**
   * Login method to verify user credentials.
   */
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
      console.log(error)
      throw new Error("Failed to authenticate user.");
    }
  }

  /**
   * Get user details by mobile number.
   */
  public async getUser(mobile: string): Promise<any> {
    try {
      return await sql`
      SELECT * 
      FROM userData 
      WHERE phone_no = ${mobile}
    `;
    } catch (error) {
     throw error
    }
  }


}
