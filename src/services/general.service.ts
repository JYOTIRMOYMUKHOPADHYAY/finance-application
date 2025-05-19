import GeneralRepository from "../repository/general";

export class GeneralService {
  private generalRepo = new GeneralRepository();
  constructor() {}
  public async getUserTypes(): Promise<any> {
    try {
      return await this.generalRepo.getUserTypes();
    } catch (error) {
      throw error;
    }
  }

  public async getLinksData(): Promise<any> {
    return await this.generalRepo.getLinksData();
  }

  public async newsUpdatesData(): Promise<any> {
    return await this.generalRepo.newsUpdatesData();
  }

  public async getAllServices(): Promise<any> {
    return await this.generalRepo.getAllServices();
  }

  public async getSubServices(id: number): Promise<any> {
    return await this.generalRepo.getSubServices(id);
  }

  public async getPeriodIdData(): Promise<any> {
    return await this.generalRepo.getPeriodIdData();
  }

  public async getMounthData(): Promise<any> {
    return await this.generalRepo.getMounthData();
  }

  public async getComplianceData(id: number): Promise<any> {
    return await this.generalRepo.getComplianceData(id);
  }

      public async applyForJob(data:any): Promise<any> {
        return await this.generalRepo.applyForJob(data);
    }

      public async getInTouch(data: any): Promise<any> {
    return await this.generalRepo.getInTouch(data);
  }
}
