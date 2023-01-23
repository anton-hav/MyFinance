/**
 * Category types
 */
export default module.exporty = {
  _categoryTypes: [
    { typeName: "Income", value: 0 },
    { typeName: "Expenses", value: 1 },
    { typeName: "All", value: 2 },
  ],

  getIncomeType() {
    return this._categoryTypes.find((categoryType) => categoryType.value === 0);
  },

  getExpensesType() {
    return this._categoryTypes.find((categoryType) => categoryType.value === 1);
  },

  getTypeForAll() {
    return this._categoryTypes.find((categoryType) => categoryType.value === 2);
  },

  getTypeByValue(value) {
    return this._categoryTypes.find(
      (categoryType) => categoryType.value === value
    );
  },

  isTypeForAll(type) {
    return type.value === this.getTypeForAll().value;
  },

  /**
   * Get types
   * @returns an array of types.
   */
  getTypes() {
    return this._categoryTypes;
  },
};
