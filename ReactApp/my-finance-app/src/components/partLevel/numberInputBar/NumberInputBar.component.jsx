import { useState } from "react";
// Import third party libraries
import {
  Paper,
  Box,
  InputBase,
  Divider,
  IconButton,
} from "../../../imports/ui.imports";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../../imports/icons.imports";
// Import styles
import "./numberInputBar.component.css";

export function NumberInputBar(props) {
  const { count, error, helperText, onChangeCount } = props;
  const [value, setValue] = useState(() => (count ? count : 0));

  /**
   * Handles the increase button click.
   */
  const handleIncreaseClick = () => {
    if (value < 999) {
      let newValue = value + 1;
      setValue(newValue);
      onChangeCount(newValue);
    }
  };

  /**
   * Handles the decrease button click.
   */
  const handleDecreaseClick = () => {
    if (value > 1) {
      let newValue = value - 1;
      setValue(newValue);
      onChangeCount(newValue);
    }
  };

  /**
   * Handles the input value change.
   * @param {*} event - React event
   */
  const handleChange = (event) => {
    let newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue !== 0) {
      setValue(newValue);
      onChangeCount(newValue);
    }
  };

  return (
    <Box className="number-input-wrapper">
      <Paper className="paper">
        <IconButton
          type="button"
          className="action-button"
          aria-label="decrease"
          onClick={handleDecreaseClick}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Divider className="divider" orientation="vertical" />
        <InputBase
          className="input-number"
          error={error ? true : false}
          value={value}
          onChange={handleChange}
          type="numeric"
          inputProps={{
            "aria-label": "input value",
            className: "input",
            maxLength: 3,
          }}
        />
        <Divider className="divider" orientation="vertical" />
        <IconButton
          type="button"
          className="action-button"
          aria-label="increase"
          onClick={handleIncreaseClick}
        >
          <ChevronRightIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
