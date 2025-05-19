import { Request, Response } from "express";
import GeneralRepository from "../repository/general";
import UserRepository from "../repository/user";

export class UserService {
  private generalRepo = new GeneralRepository();
  private userRepo = new UserRepository();
  constructor() {}

  public async getUser(mobile_no: string): Promise<any | null> {
    try {
      const user = await this.userRepo.getUser(mobile_no);
      return user && user.length > 0 ? user : null;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(id: number): Promise<any | null> {
    try {
      const user = await this.userRepo.getUserById(id);
      return user && user.length > 0 ? user : null;
    } catch (error) {
      throw error;
    }
  }

  public login(mobile: string, password: string): Promise<any> {
    return this.userRepo.login(mobile, password);
  }

  public updatePassword(
    mobile: string,
    password: string,
    salt: string
  ): Promise<any> {
    return this.userRepo.updatePassword(mobile, password, salt);
  }

  public createUser(data: object): Promise<any> {
    return this.userRepo.createUser(data);
  }
}
