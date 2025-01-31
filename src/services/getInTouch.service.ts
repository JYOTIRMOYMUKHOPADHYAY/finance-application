import GetInTouchRepository from "../repository/getInTouch";
import ServicesRepository from "../repository/service";

export class GetInTouchDataService {
  constructor(private getInTouchRepo = new GetInTouchRepository()) {}

  public async getInTouch(data: any): Promise<any> {
    return await this.getInTouchRepo.getInTouch(data);
  }
}
