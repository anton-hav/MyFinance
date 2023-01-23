import { useState } from "react";
//Import third party libraries
import { ToggleButton, ToggleButtonGroup } from "../../../imports/ui.imports";
// Import custom types and utils
import CategoryTypes from "../../../utils/categoryTypes";

const income = CategoryTypes.getIncomeType();
const expenses = CategoryTypes.getExpensesType();

export function RecordTypeButtonToggler(props) {
  const { value, onChange } = props;

  return (
    <ToggleButtonGroup
      color={value === 0 ? "success" : "error"}
      value={value}
      exclusive
      onChange={(event, newValue) => onChange(newValue)}
      aria-label="Platform"
      size="small"
      orientation="vertical"
    >
      <ToggleButton value={income.value}>{income.typeName}</ToggleButton>
      <ToggleButton value={expenses.value}>{expenses.typeName}</ToggleButton>
    </ToggleButtonGroup>
  );
}
