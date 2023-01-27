// Import third party libraries
import { Typography } from "../../../imports/ui.imports";
// Import custom part-level components
import { TransactionListForApprovalItem } from "../transactionListForApprovalItem/TransactionListForApprovalItem.component";

export function TransactionListForApproval(props) {
  const { transactionsForApproval, onApproveClick, onRejectClick } = props;

  return (
    <>
      {transactionsForApproval !== undefined &&
      transactionsForApproval.length > 0 ? (
        transactionsForApproval.map((transaction) => (
          <TransactionListForApprovalItem
            key={transaction.id}
            record={transaction}
            onApproveClick={onApproveClick}
            onRejectClick={onRejectClick}
          />
        ))
      ) : (
        <Typography>There are no planned records</Typography>
      )}
    </>
  );
}
