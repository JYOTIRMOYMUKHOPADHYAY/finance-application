import otpGenerator from "otp-generator";
import ApplyJobRepository from "../repository/applyJob";
export class ApplyJobService{
    constructor(
        private applyJob = new ApplyJobRepository()
    ) {}

    public async applyForJob(data:any): Promise<any> {
        return await this.applyJob.applyForJob(data);
    }
}