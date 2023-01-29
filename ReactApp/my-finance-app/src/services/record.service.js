// Import services
import ApiService from "./api.service";
// Import custom types and utils
import RecordDto from "../types/dto/record.dto";
import { environment } from "../environment/environment";
import RecordsRequestModel from "../types/model/requests/recordsRequest.model";
import RecordsCountRequestModel from "../types/model/requests/recordsCountRequest.model";
import UpdateRecordsRequestModel from "../types/model/requests/updateRecordRequest.model";
import RecordsAmountRequestModel from "../types/model/requests/recordsAmountRequest.model";

export default class RecordService {
  constructor() {
    this._recordsEndpoint = environment.recordsEndpoint;
    this._recordsCountEndpoint = environment.recordsCountEndpoint;
    this._recordsAmountEndpoint = environment.recordsAmountEndpoint;
    this._apiService = new ApiService();
  }

  //#region READ

  /**
   * Get records by search parameters from the API
   * @param {object} searchParameters - object that wraps search parameters
   * @returns transaction records matching the search parameters
   */
  async getRecordsBySearchParametersFromApi(searchParameters) {
    let recordsRequestModel = RecordsRequestModel.fromObject(searchParameters);
    let response = await this._apiService.get(
      this._recordsEndpoint,
      recordsRequestModel
    );
    let records = response.map((record) => RecordDto.fromResponse(record));
    return records;
  }

  /**
   * Get records count by search parameters from the API
   * @param {*} searchParameters
   * @returns count of records matching the search parameters
   */
  async getRecordsCountBySearchParametersFromApi(searchParameters) {
    let recordsCountRequestModel =
      RecordsCountRequestModel.fromObject(searchParameters);
    let response = await this._apiService.get(
      this._recordsCountEndpoint,
      recordsCountRequestModel
    );
    return response;
  }

  /**
   * Get amount of records by search parameters from the API
   * @param {*} searchParameters
   * @returns amount of records matching the search parameters
   */
  async getRecordsAmountBySearchParametersFromApi(searchParameters) {
    let recordsAmountRequestModel =
      RecordsAmountRequestModel.fromObject(searchParameters);
    let response = await this._apiService.get(
      this._recordsAmountEndpoint,
      recordsAmountRequestModel
    );
    return response;
  }

  //#endregion READ

  //#region CREATE

  /**
   * Create new transaction record in the database via API.
   * @param {number} price - price
   * @param {string} comment - comment for the record
   * @param {*} createdDate - date time of transaction
   * @param {string} categoryId - category id
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

  /**
   * Update the category trough the API
   * @param {RecordDto} record - record to update
   * @returns a boolean (true if record successfully updated)
   */
  async updateRecord(record) {
    const model = UpdateRecordsRequestModel.fromRecordDto(record);
    let response = await this._apiService.patch(
      this._recordsEndpoint,
      model,
      model.id
    );
    let result = RecordDto.fromResponse(response);
    return result instanceof RecordDto;
  }

  //#endregion UPDATE

  //#region DELETE

  /**
   * Remove a transaction record from the database via API.
   * @param {string} id - an unique identifier of the record.
   * @returns a boolean(true if record successfully removed)
   */
  async deleteRecord(id) {
    let response = await this._apiService.delete(this._recordsEndpoint, id);
    return response;
  }

  //#endregion DELETE
}
