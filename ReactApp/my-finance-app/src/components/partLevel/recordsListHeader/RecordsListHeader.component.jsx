// Import third-party libraries
import { Box } from "../../../imports/ui.imports";
// Import custom part-level components
import { SelectPeriodForRecords } from "../selectPeriodForRecords/SelectPeriodForRecords.component";
import { SelectRecordType } from "../selectRecordType/SelectRecordType.component";
// Import styles
import "./recordsListHeader.component.css";

export function RecordsListHeader(props) {
  const {
    periods,
    period,
    onPeriodChange,
    recordTypes,
    recordType,
    onRecordTypeChange,
  } = props;
  return (
    <Box className="records-list-header">
      <Box className="select-filter">
        <SelectPeriodForRecords
          periods={periods}
          value={period}
          onChange={onPeriodChange}
        />
      </Box>
      <Box className="select-filter">
        <SelectRecordType
          className="select-filter"
          recordTypes={recordTypes}
          value={recordType}
          onChange={onRecordTypeChange}
        />
      </Box>
    </Box>
  );
}
