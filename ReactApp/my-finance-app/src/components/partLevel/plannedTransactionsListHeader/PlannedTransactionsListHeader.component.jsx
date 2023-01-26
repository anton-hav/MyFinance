// Import third-party libraries
import { Box } from "../../../imports/ui.imports";
// Import custom part-level components
import { SelectRecordType } from "../selectRecordType/SelectRecordType.component";
import { SelectCategory } from "../selectCategory/SelectCategory.component";
// Import styles
import "./plannedTransactionsListHeader.component.css";

export function PlannedTransactionsListHeader(props) {
  const {
    plannedTransactionTypes,
    plannedTransactionType,
    onPlannedTransactionTypeChange,
    categories,
    onCategoryChange,
    categoryFilter,
  } = props;
  return (
    <Box className="planned-transactions-list-header">
      <Box className="select-filter">
        <SelectCategory
          className="select-filter"
          source={categories}
          onChange={onCategoryChange}
          value={categoryFilter}
        />
      </Box>
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
