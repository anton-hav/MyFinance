import { useState } from "react";
// Import third party libraries
import {
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "../../../imports/ui.imports";

export function DaysOfWeekChooser(props) {
  const { onChange } = props;
  const [selectedDays, setSelectedDays] = useState([
    { name: "Sunday", checked: false },
    { name: "Monday", checked: false },
    { name: "Tuesday", checked: false },
    { name: "Wednesday", checked: false },
    { name: "Thursday", checked: false },
    { name: "Friday", checked: false },
    { name: "Saturday", checked: false },
  ]);

  const handleChange = (event) => {
    let index = selectedDays.findIndex((day) => day.name === event.target.name);
    const day = selectedDays[index];
    day.checked = event.target.checked;
    const newSelectedDays = [
      ...selectedDays.slice(0, index),
      day,
      ...selectedDays.slice(index + 1, selectedDays.length),
    ];
    setSelectedDays(newSelectedDays);
    onChange(selectedDays);
  };

  const error = selectedDays.filter((day) => day.checked).length < 1;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        sx={{ m: 3 }}
        error={error}
        component="fieldset"
        variant="standard"
      >
        <FormLabel component="legend">Days</FormLabel>
        <Box sx={{ display: "flex" }}>
          <FormGroup>
            {selectedDays.slice(0, 3).map((item) => (
              <FormControlLabel
                key={item.name}
                control={
                  <Checkbox
                    checked={item.checked}
                    onChange={handleChange}
                    name={item.name}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>
          <FormGroup>
            {selectedDays.slice(3, 6).map((item) => (
              <FormControlLabel
                key={item.name}
                control={
                  <Checkbox
                    checked={item.checked}
                    onChange={handleChange}
                    name={item.name}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>

          <FormGroup>
            {selectedDays.slice(6, 7).map((item) => (
              <FormControlLabel
                key={item.name}
                control={
                  <Checkbox
                    checked={item.checked}
                    onChange={handleChange}
                    name={item.name}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>
        </Box>

        {error ? (
          <FormHelperText>Choose at least one day</FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  );
}
