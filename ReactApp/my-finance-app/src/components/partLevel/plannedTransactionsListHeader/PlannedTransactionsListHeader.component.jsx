// Import third-party libraries
import { Box } from "../../../imports/ui.imports";
// Import custom part-level components
import { SelectRecordType } from "../selectRecordType/SelectRecordType.component";
// Import styles
import "./plannedTransactionsListHeader.component.css";

export function PlannedTransactionsListHeader(props) {
  const {
    plannedTransactionTypes,
    plannedTransactionType,
    onPlannedTransactionTypeChange,
  } = props;
  return (
    <Box className="planned-transactions-list-header">
      <Box className="select-filter">
        <SelectRecordType
          className="select-filter"
          recordTypes={plannedTransactionTypes}
          value={plannedTransactionType}
          onChange={onPlannedTransactionTypeChange}
        />
      </Box>
    </Box>
  );
}
