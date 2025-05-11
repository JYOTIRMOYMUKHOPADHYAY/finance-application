import sql from "../../config/db";

export default class UpdateNewsRepository {
  constructor() {}

  public async createNewsService(
    message: string,
    adminUser: any
  ): Promise<any> {
    try {
      return await sql`
  INSERT INTO newsUpdateData (
    message,
    created_by
  ) 
  VALUES (
    ${message},
    ${adminUser.user_id}
  )
  RETURNING *;
`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
