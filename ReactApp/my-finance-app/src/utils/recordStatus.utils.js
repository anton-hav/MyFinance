/**
 * Status of the transaction record
 */
export default module = {
  _recordStatus: [
    { name: "Approved", value: 0 },
    { name: "Planned", value: 1 },
    { name: "Rejected", value: 2 },
  ],

  getApprovedStatus() {
    return this._recordStatus.find((status) => status.value === 0);
  },

  getPlannedStatus() {
    return this._recordStatus.find((status) => status.value === 1);
  },

  getRejectedStatus() {
    return this._recordStatus.find((status) => status.value === 2);
  },
};
