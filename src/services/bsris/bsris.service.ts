import BRISSoleProprietorshipRepository from "../../repository/bsris/bsris";

export class BRISSoleProprietorshipService {
  constructor(private servicesRepo = new BRISSoleProprietorshipRepository()) {}

  public async soleProprietorship(data: any): Promise<any> {
    return await this.servicesRepo.soleProprietorship(data);
  }
  public async parternershipForm(data: any): Promise<any> {
    return await this.servicesRepo.parternershipForm(data);
  }
}
