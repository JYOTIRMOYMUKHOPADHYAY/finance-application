import UpdateNewsRepository from "../../repository/admin/newsUpdate";

export class UpdateNewsService {
  constructor(private newsRepo = new UpdateNewsRepository()) {}

  public async createNewsService(
    message: string,
    adminUser: any
  ): Promise<any> {
    try {
      return await this.newsRepo.createNewsService(message, adminUser);
    } catch (error) {
      throw error;
    }
  }
}
