import sql from "../config/db";
interface getInTouch {
  name: string;
  email: string;
  phone_no: string;
  required_service: number;
  message: string;
}

export default class GetInTouchRepository {
  constructor() {}

  public async getInTouch(data: getInTouch): Promise<any> {
    try {
      return await sql`
      INSERT INTO getInTouch (
        name, phone_no, email, required_service, message
) 
VALUES (
    ${data.name}, --string
    ${data.phone_no},  -- string 
    ${data.email}, -- string
    ${data.required_service}, -- number
    ${data.message} -- string
);
    `;
    } catch (error) {
      throw error;
    }
  }
}
