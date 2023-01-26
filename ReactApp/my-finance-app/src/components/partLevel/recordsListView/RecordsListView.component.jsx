// Import third party libraries
import { Typography } from "../../../imports/ui.imports";

// Import custom part-level components
import { RecordsListItem } from "../recordsListItem/RecordsListItem.component";
import { RecordsListHeader } from "../recordsListHeader/RecordsListHeader.component";

export function RecordsListView(props) {
  const {
    records,
    periods,
    period,
    onDeleteClick,
    onPeriodChange,
    recordTypes,
    recordType,
    onRecordTypeChange,
  } = props;

  return (
    <>
      <RecordsListHeader
        periods={periods}
        period={period}
        onPeriodChange={onPeriodChange}
        recordTypes={recordTypes}
        recordType={recordType}
        onRecordTypeChange={onRecordTypeChange}
      />
      {records !== undefined && records.length > 0 ? (
        records.map((record) => (
          <RecordsListItem
            key={record.id}
            record={record}
            onDeleteClick={onDeleteClick}
          />
        ))
      ) : (
        <Typography sx={{ m: 2 }} variant="body1">
          There are no records
        </Typography>
      )}
    </>
  );
}
