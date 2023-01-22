// Import custom part-level components
import { RecordsListItem } from "../recordsListItem/RecordsListItem.component";

export function RecordsListView(props) {
  const { records } = props;

  return (
    <>
      {records !== undefined
        ? records.map((record) => (
            <RecordsListItem key={record.id} record={record} />
          ))
        : null}
    </>
  );
}
