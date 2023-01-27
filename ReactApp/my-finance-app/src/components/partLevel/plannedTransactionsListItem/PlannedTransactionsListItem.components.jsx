import { useState, useRef } from "react";
// Import third-party libraries
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  IconButton,
  Slide,
} from "../../../imports/ui.imports";
import {
  ExpandMoreIcon,
  ExpandLessIcon,
  DeleteIcon,
} from "../../../imports/icons.imports";
import { dayjs, cronParser, cronstrue } from "../../../imports/utils.import";
// Import custom types and utils
import { formatter } from "../../../utils/formatter";
import CategoryTypes from "../../../utils/categoryTypes";
// Import stylesheet
import "./plannedTransactionsListItem.component.css";

const income = CategoryTypes.getIncomeType();
const expense = CategoryTypes.getExpensesType();

/**
 * Formats the planned transaction amount depending on the category type
 * @param {RecordInRecordsListViewModel} plannedTransaction - planned transaction to display
 * @returns string
 */
function priceFormatter(plannedTransaction) {
  return plannedTransaction.category.type === 0
    ? `+ ${formatter.format(plannedTransaction.price)}`
    : `- ${formatter.format(plannedTransaction.price)}`;
}

export function PlannedTransactionsListItem(props) {
  const { plannedTransaction, onDeleteClick } = props;
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const containerRef = useRef(null);

  return (
    <>
      <Paper className="planned-transactions-list-item">
        <Grid container spacing={1} ref={containerRef}>
          <Grid item lg={3} md={3} className="category-name">
            <Typography>{plannedTransaction.category.name}</Typography>
          </Grid>

          <Grid item lg={6} md={6} className="cron">
            <Typography>
              {cronstrue.toString(plannedTransaction.cron, {
                verbose: true,
                use24HourTimeFormat: true,
              })}
            </Typography>
          </Grid>

          <Grid item lg={3} md={3} className="price">
            <Typography
              color={
                plannedTransaction.category.type === income.value
                  ? "#2e7d32"
                  : "error"
              }
              component="div"
            >
              {priceFormatter(plannedTransaction)}
            </Typography>
            <Box>
              <IconButton onClick={() => onDeleteClick(plannedTransaction)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
