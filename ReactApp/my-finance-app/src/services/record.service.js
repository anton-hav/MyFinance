// Import services
import ApiService from "./api.service";
// Import custom types and utils
import RecordDto from "../types/dto/record.dto";
import { environment } from "../environment/environment";

export default class RecordService {
  constructor() {
    this._recordsEndpoint = environment.recordsEndpoint;
    this._apiService = new ApiService();
  }

  //#region READ

  //#endregion READ

  //#region CREATE

  /**
   * Create new transaction record in the database via API.
   * @param {number} price - category name
   * @param {string} comment - comment for the record
   * @param {*} createdDate - date time of transaction
   * @param {string} categoryId - category name
   * @return a newly record.
   */
  async createNewRecord(price, comment, createdDate, categoryId) {
    let response = await this._apiService.post(this._recordsEndpoint, {
      price: price,
      comment: comment,
      createdDate: createdDate,
      categoryId: categoryId,
    });
    let record = RecordDto.fromResponse(response);
    return record;
  }

  //#endregion CREATE

  //#region UPDATE

  //#endregion UPDATE

  //#region DELETE

  //#endregion DELETE
}
