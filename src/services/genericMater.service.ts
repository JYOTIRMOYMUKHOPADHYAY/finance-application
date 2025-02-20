import GenericMasterRepository from "../repository/genericMaster";

export class GenericMasterDataService {
  constructor(private genericMasterRepo = new GenericMasterRepository()) {}

  public async getDropdownData(): Promise<any> {
    return await this.genericMasterRepo.getDropdownData();
  }
}
