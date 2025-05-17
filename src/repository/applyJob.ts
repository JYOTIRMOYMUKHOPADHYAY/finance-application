import sql from "../config/db";
import Database from "../config/db";
interface applyJob {
  name: string;
  email: string;
  phone_no: string;
  experience: string;
  current_location: string;
  user_type: number;
  agreement: boolean;
  status: boolean;
  filePath: string;
}

export default class ApplyJobRepository {
  constructor() {}

  /**
   * Get user details by mobile number.
//    */
//   public async applyForJob(data: applyJob): Promise<any> {
//     try {
//       return await sql`
//       INSERT INTO applyToJob (
//         name, email, phone_no, experience, current_location, user_type, agreement,status, filePath
// ) 
// VALUES (
//     ${data.name}, --string
//     ${data.email},  -- string 
//     ${data.phone_no}, -- string
//     ${data.experience}, -- string
//     ${data.current_location}, -- string
//     ${data.user_type}, -- number
//     ${data.agreement}, --boolean
//     ${data.status}, --string
//     ${data.filePath} -- string
// );
//     `;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
}
