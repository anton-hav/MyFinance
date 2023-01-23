// Import custom part-level components
import { RecordsListItem } from "../recordsListItem/RecordsListItem.component";
import { RecordsListHeader } from "../recordsListHeader/RecordsListHeader.component";

export function RecordsListView(props) {
  const { records, periods, period, onDeleteClick, onPeriodChange } = props;

  return (
    <>
      <RecordsListHeader
        periods={periods}
        period={period}
        onPeriodChange={onPeriodChange}
      />
      {records !== undefined
        ? records.map((record) => (
            <RecordsListItem
              key={record.id}
              record={record}
              onDeleteClick={onDeleteClick}
            />
          ))
        : null}
    </>
  );
}
