// Import third party libraries
import { Typography } from "../../../imports/ui.imports";

// Import custom part-level components
import { RecordsListItem } from "../recordsListItem/RecordsListItem.component";
import { PlannedTransactionsListHeader } from "../plannedTransactionsListHeader/PlannedTransactionsListHeader.component";
import { PlannedTransactionsListItem } from "../plannedTransactionsListItem/PlannedTransactionsListItem.components";

export function PlannedTransactionListView(props) {
  const {
    plannedTransactions,
    onDeleteClick,
    plannedTransactionTypes,
    plannedTransactionType,
    onPlannedTransactionTypeChange,
  } = props;

  return (
    <>
      <PlannedTransactionsListHeader
        plannedTransactionTypes={plannedTransactionTypes}
        plannedTransactionType={plannedTransactionType}
        onPlannedTransactionTypeChange={onPlannedTransactionTypeChange}
      />
      {plannedTransactions !== undefined && plannedTransactions.length > 0 ? (
        plannedTransactions.map((transaction) => (
          <PlannedTransactionsListItem
            key={transaction.id}
            plannedTransaction={transaction}
            onDeleteClick={onDeleteClick}
          />
        ))
      ) : (
        <Typography sx={{ m: 2 }} variant="body1">
          There are no planned transactions
        </Typography>
      )}
    </>
  );
}
