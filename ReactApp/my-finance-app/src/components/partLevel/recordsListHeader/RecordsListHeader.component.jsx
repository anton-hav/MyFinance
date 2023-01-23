// Import third-party libraries
import { FormControl, InputLabel, Select } from "../../../imports/ui.imports";
// Import custom part-level components
import { SelectPeriodForRecords } from "../selectPeriodForRecords/SelectPeriodForRecords.component";

export function RecordsListHeader(props) {
  const { periods, period, onPeriodChange } = props;
  return (
    <>
      <SelectPeriodForRecords
        periods={periods}
        value={period}
        onChange={onPeriodChange}
      />
    </>
  );
}
