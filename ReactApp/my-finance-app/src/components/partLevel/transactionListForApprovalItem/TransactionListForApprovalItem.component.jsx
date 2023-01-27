import { useState } from "react";
// Import third-party libraries
import { Box, Paper, Typography, Button } from "../../../imports/ui.imports";

import { dayjs } from "../../../imports/utils.import";
// Import custom types and utils
import { formatter } from "../../../utils/formatter";
import CategoryTypes from "../../../utils/categoryTypes";
// Import stylesheet
import "./transactionListForApprovalItem.component.css";

const income = CategoryTypes.getIncomeType();

/**
 * Formats the date.
 * @param {string} date - date of the record creation
 * @returns string
 */
function dateFormatter(date) {
  return dayjs(date).format("dddd, YYYY MMMM DD HH:mm:ss").toString();
}

/**
 * Formats the record amount depending on the category type
 * @param {RecordInListForApprovalViewModel} record - record to display
 * @returns string
 */
function priceFormatter(record) {
  return record.category.type === 0
    ? `+ ${formatter.format(record.price)}`
    : `- ${formatter.format(record.price)}`;
}

export function TransactionListForApprovalItem(props) {
  const { record, onDeleteClick, onApproveClick, onRejectClick } = props;

  //   return (
  //     <>
  //       <Paper className="transactions-list-item">
  //         <Grid container spacing={1} ref={containerRef}>
  //           <Grid item lg={3} md={5} className="date">
  //             <Typography>{dateFormatter(record.createdDate)}</Typography>
  //           </Grid>
  //           <Grid item lg={2} md={2} className="price">
  //             <Typography
  //               color={
  //                 record.category.type === income.value ? "#2e7d32" : "error"
  //               }
  //               component="div"
  //             >
  //               {priceFormatter(record)}
  //             </Typography>
  //           </Grid>
  //           <Grid item lg={7} md={5} className="category">
  //             <Typography>{record.category.name}</Typography>
  //             <Box>
  //               {record.comment !== "" ? (
  //                 <IconButton
  //                   size="small"
  //                   aria-label="expand"
  //                   onClick={handleShowComment}
  //                 >
  //                   {isCommentExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
  //                 </IconButton>
  //               ) : null}
  //               <IconButton onClick={() => onDeleteClick(record)}>
  //                 <DeleteIcon />
  //               </IconButton>
  //             </Box>
  //           </Grid>

  //           {isCommentExpanded ? (
  //             <Grid item xs={12}>
  //               <Divider />
  //               <Slide
  //                 direction="left"
  //                 in={isCommentExpanded}
  //                 container={containerRef.current}
  //               >
  //                 <Typography className="comment" variant="body2">
  //                   {record.comment}
  //                 </Typography>
  //               </Slide>
  //             </Grid>
  //           ) : null}
  //         </Grid>
  //       </Paper>
  //     </>
  //   );

  return (
    <>
      <Paper className="transactions-list-item">
        <Box className="wrapper">
          <Box className="first-line">
            <Typography variant="body2">
              Scheduled for {dateFormatter(record.createdDate)}
            </Typography>
            <Typography
              color={
                record.category.type === income.value ? "#2e7d32" : "error"
              }
              component="div"
            >
              {priceFormatter(record)}
            </Typography>
          </Box>
          <Box className="second-line">
            <Typography variant="body1" className="category">
              {record.category.name}
            </Typography>
            <Box className="buttons">
              <Button
                variant="outlined"
                color="success"
                onClick={() => onApproveClick(record)}
              >
                Approve
              </Button>
              <Button color="error" onClick={() => onRejectClick(record)}>
                Reject
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
