// Import third-party libraries
import { dayjs } from "../imports/utils.import";

export default module = {
  _periods: [
    { periodName: "Today", value: 0 },
    { periodName: "This week", value: 1 },
    { periodName: "Last week", value: 2 },
    { periodName: "This month", value: 3 },
    { periodName: "Last month", value: 4 },
    { periodName: "All", value: 5 },
  ],

  /**
   * Get period name of the period by default.
   * @returns
   */
  getPeriodNameByDefault() {
    return this._periods[0].periodName;
  },

  /**
   * Get array of period names
   * @returns period names
   */
  getPeriodsAsArrayOfString() {
    return this._periods.map((period) => period.periodName);
  },

  /**
   * Convert period names to array of search parameters.
   * @param {*} periodName - period name
   * @returns array of search parameters that contains two entity such date from and date to.
   */
  convertPeriodNameToSearchParameters(periodName) {
    let dateFrom;
    let dateTo = dayjs(new Date());
    if (periodName === this._periods[0].periodName) {
      dateFrom = dateTo.startOf("date");
    } else if (periodName === this._periods[1].periodName) {
      dateFrom = dateTo.startOf("week");
    } else if (periodName === this._periods[2].periodName) {
      dateFrom = dateTo.subtract(1, "week");
    } else if (periodName === this._periods[3].periodName) {
      dateFrom = dateTo.startOf("month");
    } else if (periodName === this._periods[4].periodName) {
      dateFrom = dateTo.subtract(1, "month");
    } else {
      dateFrom = null;
    }
    return [dateFrom, dateTo];
  },
};
