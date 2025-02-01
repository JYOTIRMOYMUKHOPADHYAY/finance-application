import otpGenerator from "otp-generator";
import twilio from "twilio";
import dotenv from "dotenv";
import RedisService from "../redis/setUp";
import { AWSService } from "./AWS.service";
dotenv.config();
export class OtpGenerator {
  // Twilio Credentials
  // private twiloAccountSid: string = process.env.TWILO_ACC_SID!;
  // private twiloAuthToken: string = process.env.TWILO_AUTH_TOKEN!;
  // private twiloPhoneNo: string = `${process.env.TWILO_PHONE_NO}`;
  // private twilioClient = twilio(this.twiloAccountSid, this.twiloAuthToken);
  private awsService = new AWSService();
  private redis = RedisService;
  constructor() {}

  public generateOtp(): string {
    try {
      const otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      return otp;
    } catch (error) {
      console.log("========generateOtp=====");
      console.log(error);
      throw error;
    }
  }

  public async sendOtp(
    userData: any,
    message: string,
    otp: string
  ): Promise<any> {
    try {
      // const response = await this.twilioClient.messages.create({
      //   body: message,
      //   from: this.twiloPhoneNo, // Replace with your Twilio number
      //   to: userData.phone_no.toString(),
      // });
      const response = await this.awsService.sendOTPusingSNS(
        userData.phone_no.toString(),
        otp
      );
      await this.redis.setWithExpiry(userData.user_id.toString(), otp);
      return response;
    } catch (error) {
      console.log("========sendOtp=====");
      console.log(error);
      throw error;
    }
  }

  public async verifyOtp(userData: any, otp: string): Promise<any> {
    try {
      const data = await this.redis.getValue(userData.user_id.toString());
      if (data) await this.redis.removeValue(userData.user_id.toString());
      return data === otp ? true : false;
    } catch (error) {
      console.log("========verifyOtp=====");
      console.log(error);
      throw error;
    }
  }
}
