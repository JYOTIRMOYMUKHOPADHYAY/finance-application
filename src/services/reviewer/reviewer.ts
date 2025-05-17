import { STATUS } from "../../globalVariable";
import ReviewerRepository from "../../repository/reviewer/reviewer";
import StaffRepository from "../../repository/staff/staff";

export class ReviewerService {
  constructor(private servicesRepo = new ReviewerRepository()) {}

  public async approveRejectServicesSubmission(
    reviewerUser: any,
    requestId: number,
    isSubmitted?: boolean
  ): Promise<any> {
    const reqDetails = await this.servicesRepo.getRequestDetails(requestId);

    if (reqDetails.length == 0) {
      throw new Error("No data found");
    }
    if (reqDetails[0].status == STATUS.COMPLETED) {
      throw new Error("Request already completed.");
    }
    if (!isSubmitted) {
      const data = await this.servicesRepo.approveRejectServicesSubmission(
        requestId,
        reviewerUser
      );
      return data;
    }
    if (isSubmitted) {
      const data = await this.servicesRepo.approveRejectServicesSubmission(
        requestId,
        reviewerUser,
        isSubmitted
      );
      return data;
    }
    throw new Error("No data found");
  }
}
