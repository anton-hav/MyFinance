import * as React from "react";
// Import third party libraries
import { dayjs } from "../../../imports/utils.import";
import {
  TextField,
  AdapterDayjs,
  LocalizationProvider,
  DateTimePicker,
} from "../../../imports/ui.imports";

export function DateTimeField(props) {
  const { name, label, value, error, helperText, onChange } = props;
  const [innerValue, setInnerValue] = React.useState(
    dayjs(value ? value : new Date())
  );

  /**
   * Handle change event
   * @param {Date} newValue - value from date picker
   */
  const handleChange = (newValue) => {
    setInnerValue(newValue);
    onChange(name, newValue);
  };

  console.log("error on the date picker: ", error);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => (
          <TextField
            {...props}
            error={error ? true : false}
            helperText={helperText ? helperText : null}
          />
        )}
        label={label}
        value={innerValue}
        onChange={(newValue) => handleChange(newValue)}
        ampm={false}
      />
    </LocalizationProvider>
  );
}
