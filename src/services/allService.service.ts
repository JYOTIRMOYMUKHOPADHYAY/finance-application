import ServicesRepository from "../repository/service";

export class ServicesDataService {
  constructor(private servicesRepo = new ServicesRepository()) {}

  public async getAllServices(): Promise<any> {
    return await this.servicesRepo.getAllServices();
  }

  public async getSubServices(id: number): Promise<any> {
    return await this.servicesRepo.getSubServices(id);
  }
}
