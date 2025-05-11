import GenericMasterRepository from "../repository/genericMaster";

export class GenericMasterDataService {
  constructor(private genericMasterRepo = new GenericMasterRepository()) {}

  public async getDropdownData(): Promise<any> {
    return await this.genericMasterRepo.getDropdownData();
  }
  public async getMounthData(): Promise<any> {
    return await this.genericMasterRepo.getMounthData();
  }

  public async getComplianceData(id: number): Promise<any> {
    return await this.genericMasterRepo.getComplianceData(id);
  }
  public async getLinksData(): Promise<any> {
    return await this.genericMasterRepo.getLinksData();
  }
  public async newsUpdatesData(): Promise<any> {
    return await this.genericMasterRepo.newsUpdatesData();
  }
}
