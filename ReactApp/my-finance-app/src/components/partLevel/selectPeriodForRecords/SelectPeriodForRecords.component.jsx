// Import third-party libraries
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "../../../imports/ui.imports";

export function SelectPeriodForRecords(props) {
  const { onChange, value, periods } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="select-label">Period</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={value}
        label="Period"
        onChange={handleChange}
      >
        {periods.map((p) => (
          <MenuItem key={p} value={p}>
            {p}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
