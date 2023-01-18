/**
 * Category types
 */
export default module.exporty = {
  _categoryTypes: [
    { typeName: "Income", value: 0 },
    { typeName: "Expenses", value: 1 },
  ],

  getIncomeType() {
    return this._categoryTypes.find((categoryType) => categoryType.value === 0);
  },

  getExpensesType() {
    return this._categoryTypes.find((categoryType) => categoryType.value === 1);
  },

  getTypeByValue(value) {
    return this._categoryTypes.find(
      (categoryType) => categoryType.value === value
    );
  },

  /**
   * Get types
   * @returns an array of types.
   */
  getTypes() {
    return this._categoryTypes;
  },
};
