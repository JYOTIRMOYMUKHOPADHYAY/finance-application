import sql from "../../config/db";
import { STATUS } from "../../globalVariable";

export default class Repository {
  constructor() {}
  public async getRequestDetails(reqId: number): Promise<any> {
    try {
      return await sql`
SELECT * FROM serviceRequest WHERE id = ${reqId};
`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async approveRejectServicesSubmission(
    requestId: number,
    reviewerUser: any,
    isSubmitted?: boolean
  ): Promise<any> {
    try {
      const status = isSubmitted ? STATUS.VERIFIED : STATUS.REJECTED;
      return await sql`
UPDATE serviceRequest
SET status = ${status}::status_enum,
    updated_by = ${reviewerUser.user_id}
WHERE id = ${requestId}
RETURNING *;

`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
