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
import { ExpandMoreIcon, ExpandLessIcon } from "../../../imports/icons.imports";
import { dayjs } from "../../../imports/utils.import";
// Import custom types and utils
import { formatter } from "../../../utils/formatter";
import CategoryTypes from "../../../utils/categoryTypes";
// Import stylesheet
import "./recordsListItem.component.css";

const income = CategoryTypes.getIncomeType();
const expense = CategoryTypes.getExpensesType();

function dateFormatter(date) {
  return dayjs(date).format("dddd, YYYY MMMM DD HH:mm:ss").toString();
}

function priceFormatter(record) {
  return record.category.type === 0
    ? `+ ${formatter.format(record.price)}`
    : `- ${formatter.format(record.price)}`;
}

export function RecordsListItem(props) {
  const { record } = props;
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const containerRef = useRef(null);

  /**
   * Handle click events on the expand icon.
   */
  const handleShowComment = () => {
    setIsCommentExpanded(!isCommentExpanded);
  };

  return (
    <>
      <Paper className="records-list-item">
        <Grid container spacing={1} ref={containerRef}>
          <Grid item lg={3} md={5}>
            <Typography>{dateFormatter(record.createdDate)}</Typography>
          </Grid>
          <Grid item lg={2} md={2} className="price">
            <Typography
              color={
                record.category.type === income.value ? "#2e7d32" : "error"
              }
              component="div"
            >
              {priceFormatter(record)}
            </Typography>
          </Grid>
          <Grid item lg={7} md={5} className="category">
            <Typography>{record.category.name}</Typography>
            {record.comment !== "" ? (
              <IconButton
                size="small"
                aria-label="expand"
                onClick={handleShowComment}
              >
                {isCommentExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            ) : null}
          </Grid>
          {isCommentExpanded ? (
            <Slide
              direction="left"
              in={isCommentExpanded}
              container={containerRef.current}
            >
              <Grid item xs={12}>
                <Divider />
                <Typography className="comment" variand="body2">
                  {record.comment}
                </Typography>
              </Grid>
            </Slide>
          ) : null}
        </Grid>
      </Paper>
    </>
  );
}
