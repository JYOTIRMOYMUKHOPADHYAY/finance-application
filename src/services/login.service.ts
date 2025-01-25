import { Request, Response } from "express";
import LoginRepository from "../repository/login";

export class LoginService {
  private loginRepo = new LoginRepository();
  constructor() {}
  public async getUserTypes(): Promise<any> {
    try {
      return await this.loginRepo.getUserTypes();
    } catch (error) {
      throw error;
    }
  }

  public async getUser(mobile_no: string): Promise<any | null> {
    try {
      const user = await this.loginRepo.getUser(mobile_no);
      return user && user.length > 0 ? user : null;
    } catch (error) {
      throw error;
    }
  }

  public login(mobile: string, password: string): Promise<any> {
    return this.loginRepo.login(mobile, password);
  }
}
