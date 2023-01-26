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
    </>
  );
}
