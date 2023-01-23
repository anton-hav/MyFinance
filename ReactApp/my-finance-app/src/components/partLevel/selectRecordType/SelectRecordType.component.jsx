// Import third-party libraries
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "../../../imports/ui.imports";
// Import custom types and utils
import CategoryTypes from "../../../utils/categoryTypes";

export function SelectRecordType(props) {
  const { onChange, value, recordTypes } = props;

  const handleChange = (event) => {
    const recordType = CategoryTypes.getTypeByValue(event.target.value);
    onChange(recordType);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="record-type-select-label">Select record type</InputLabel>
      <Select
        labelId="record-type-select-label"
        id="record-type-select"
        value={value.value}
        label="Select record type"
        onChange={handleChange}
      >
        {recordTypes.map((t) => (
          <MenuItem key={t.value} value={t.value}>
            {t.typeName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
