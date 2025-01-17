import RegisterRepository from "../repository/register";

export class RegisterService {

  constructor(private registerRepo = new RegisterRepository()) {}

  public register(data: object): Promise<any> {
    return this.registerRepo.register(data);
  }

}
