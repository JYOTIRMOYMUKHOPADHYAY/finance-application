import otpGenerator from "otp-generator";
export class OtpGenerator{
    constructor() {}

    public generateOtp(): string {
        const otp = otpGenerator.generate(6, { 
            digits: true, 
            upperCaseAlphabets: false, 
            specialChars: false, 
            lowerCaseAlphabets: false 
        });
        return otp;
    }
}