/**
 * The view model for ColumnChartRecord component.
 * It represents a category with the associated the records count.
 */
export default class RecordAmountInColumnViewModel {
  recordType = null;
  date = null;
  value = null;

  constructor(recordType, date, value) {
    if (recordType !== undefined) this.recordType = recordType;
    if (date !== undefined) this.date = date;
    if (value !== undefined) this.value = value;
  }
}
