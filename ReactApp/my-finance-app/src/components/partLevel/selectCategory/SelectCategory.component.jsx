import { useState } from "react";
//Import third party libraries
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "../../../imports/ui.imports";

export function SelectCategory(props) {
  const { source, name, value, error, helperText, onChange } = props;

  const isComponentUsedInForm = name ? true : false;

  const style = isComponentUsedInForm ? { m: 1, minWidth: 120 } : null;

  const handleChange = (event) => {
    if (isComponentUsedInForm) {
      onChange(name, event.target.value);
    } else {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl fullWidth sx={style}>
      <InputLabel id="category-select-label">Select category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={value}
        label="Select category"
        // onChange={(event) => onChange(name, event.target.value)}
        onChange={handleChange}
        variant={isComponentUsedInForm ? "standard" : "outlined"}
        error={error ? true : false}
        size={isComponentUsedInForm ? "medium" : "small"}
      >
        <MenuItem value="" disabled={isComponentUsedInForm ? true : false}>
          <em>None</em>
        </MenuItem>
        {source.length > 0
          ? source.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))
          : null}
      </Select>
      {error ? (
        <FormHelperText error={error ? true : false}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
