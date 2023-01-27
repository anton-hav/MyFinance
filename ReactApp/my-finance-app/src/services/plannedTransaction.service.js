// Import services
import ApiService from "./api.service";
// Import custom types and utils
import PlannedTransactionDto from "../types/dto/plannedTransaction.dto";
import { environment } from "../environment/environment";
import PlannedTransactionsRequestModel from "../types/model/requests/plannedTransactionsRequest.model";

export default class PlannedTransactionService {
  constructor() {
    this._plannedTransactionsEndpoint = environment.plannedTransactionsEndpoint;
    this._apiService = new ApiService();
  }

  //#region READ

  /**
   * Get planned transactions by search parameters from the API
   * @param {object} searchParameters - object that wraps search parameters
   * @returns planned transactions matching the search parameters
   */
  async getPlannedTransactionsBySearchParametersFromApi(searchParameters) {
    let plannedTransactionsRequestModel =
      PlannedTransactionsRequestModel.fromObject(searchParameters);
    let response = await this._apiService.get(
      this._plannedTransactionsEndpoint,
      plannedTransactionsRequestModel
    );
    let plannedTransactions = response.map((planned) =>
      PlannedTransactionDto.fromResponse(planned)
    );
    return plannedTransactions;
  }

  //#endregion READ

  //#region CREATE

  /**
   * Create new planned transaction in the database via API.
   * @param {number} price - price
   * @param {string} cron - cron expression
   * @param {string} categoryId - category id
   * @return a newly planned transaction.
   */
  async createNewPlannedTransaction(price, categoryId, cron) {
    let response = await this._apiService.post(
      this._plannedTransactionsEndpoint,
      {
        price: Number(price),
        crone: cron,
        categoryId: categoryId,
      }
    );
    let plannedTransaction = PlannedTransactionDto.fromResponse(response);
    return plannedTransaction;
  }

  //#endregion CREATE

  //#region DELETE

  /**
   * Remove a planned transaction from the database via API.
   * @param {string} id - an unique identifier of the planned transaction.
   * @returns a boolean(true if planned transaction successfully removed)
   */
  async deletePlannedTransaction(id) {
    let response = await this._apiService.delete(
      this._plannedTransactionsEndpoint,
      id
    );
    return response;
  }

  //#endregion DELETE
}
