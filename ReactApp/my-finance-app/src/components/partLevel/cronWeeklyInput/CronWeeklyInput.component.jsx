import { useState } from "react";
// Import third party libraries
import { Box, Typography } from "../../../imports/ui.imports";
// Import custom part-level components
import { NumberInputBar } from "../numberInputBar/NumberInputBar.component";
import { DaysOfWeekChooser } from "../daysOfWeekChooser/DaysOfWeekChooser.component";
// Import styles
import "./cronWeeklyInput.component.css";

export function CronWeeklyInput(props) {
  const { name, onChange } = props;
  const [count, setCount] = useState(1);
  const [days, setDays] = useState([]);

  const generateCron = (args) => {
    let { daysOfWeek } = args;
    if (daysOfWeek === undefined) daysOfWeek = days;

    const daysPart = daysOfWeek
      .map((day, index) => (day.checked ? index + 1 : -1))
      .filter((index) => index !== -1);

    const cronExpression = `0 0 * * ${daysPart.length > 0 ? daysPart : "*"}`;

    return cronExpression;
  };

  const handleDaysOfWeekChange = (daysOfWeek) => {
    setDays(daysOfWeek);
    const cronExpression = generateCron({ daysOfWeek });
    onChange(name, cronExpression);
  };

  return (
    <>
      <Box className="cron-daily-input">
        <DaysOfWeekChooser onChange={handleDaysOfWeekChange} />
      </Box>
    </>
  );
}
