import { useState } from "react";
// Import third party libraries
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  FormHelperText,
  FormControl,
} from "../../../imports/ui.imports";
// Import styles
import "./cronMonthlyInput.component.css";

const days = [...Array(32).keys()].slice(1);

export function CronMonthlyInput(props) {
  const { name, onChange } = props;
  const [selectedDays, setSelectedDays] = useState([]);

  const generateCron = (args) => {
    const cronExpression = `0 0 ${args.length > 0 ? args : "*"} * *`;
    return cronExpression;
  };

  const handleChange = (event, newDays) => {
    setSelectedDays(newDays);
    const cronExpression = generateCron(newDays);
    onChange(name, cronExpression);
  };

  const error = selectedDays.length < 1;

  return (
    <>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Choose days
      </Typography>
      <FormControl error={error}>
        <Box className="cron-monthly-input">
          <Box className="wrapper">
            <Box className="line">
              <ToggleButtonGroup
                value={selectedDays}
                onChange={handleChange}
                aria-label="days of the month"
                className="cron-monthly-input"
              >
                {days.slice(0, 7).map((day) => (
                  <ToggleButton key={day} value={day} className="button">
                    <Typography>{day}</Typography>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box className="line">
              <ToggleButtonGroup
                value={selectedDays}
                onChange={handleChange}
                aria-label="days of the month"
                className="cron-monthly-input"
              >
                {days.slice(7, 14).map((day) => (
                  <ToggleButton key={day} value={day} className="button">
                    <Typography>{day}</Typography>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box className="line">
              <ToggleButtonGroup
                value={selectedDays}
                onChange={handleChange}
                aria-label="days of the month"
                className="cron-monthly-input"
              >
                {days.slice(14, 21).map((day) => (
                  <ToggleButton key={day} value={day} className="button">
                    <Typography>{day}</Typography>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box className="line">
              <ToggleButtonGroup
                value={selectedDays}
                onChange={handleChange}
                aria-label="days of the month"
                className="cron-monthly-input"
              >
                {days.slice(21, 28).map((day) => (
                  <ToggleButton key={day} value={day} className="button">
                    <Typography>{day}</Typography>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box className="line">
              <ToggleButtonGroup
                value={selectedDays}
                onChange={handleChange}
                aria-label="days of the month"
                className="cron-monthly-input"
              >
                {days.slice(28, 31).map((day) => (
                  <ToggleButton key={day} value={day} className="button">
                    <Typography>{day}</Typography>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Box>
        {error ? (
          <FormHelperText>Choose at least one day</FormHelperText>
        ) : null}
      </FormControl>
    </>
  );
}
