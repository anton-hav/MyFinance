import { useState } from "react";
// Import third party libraries
import { Box, Typography } from "../../../imports/ui.imports";
// Import custom part-level components
import { NumberInputBar } from "../numberInputBar/NumberInputBar.component";
// Import styles
import "./cronDailyInput.component.css";

export function CronDailyInput(props) {
  const { name, error, helperText, onChange } = props;
  const [count, setCount] = useState(0);

  const handleCountChange = (count) => {
    setCount(count);
    onChange(name, `0 0 */${count} * *`);
  };

  console.log(error);
  console.log(helperText);

  return (
    <>
      <Box className="cron-daily-input">
        <Typography variant="body1" sx={{ mr: 1 }}>
          Every
        </Typography>
        <NumberInputBar count={count} onChangeCount={handleCountChange} />
        <Typography variant="body1" sx={{ ml: 1 }}>
          days
        </Typography>
      </Box>
      {error ? (
        <Typography
          variant="body2"
          sx={{ color: "#d32f2f", fontSize: "0.75rem" }}
        >
          {helperText}
        </Typography>
      ) : null}
    </>
  );
}
