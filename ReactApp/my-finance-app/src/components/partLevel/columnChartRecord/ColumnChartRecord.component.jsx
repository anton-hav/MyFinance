// Import third party libraries
import { Column } from "../../../imports/ui.imports";
// Import custom part level components
import { SelectPeriodForRecords } from "../selectPeriodForRecords/SelectPeriodForRecords.component";

export function ColumnChartRecord(props) {
  const { data, periods, period, onChange } = props;

  const config = {
    data,
    isGroup: true,
    xField: "date",
    yField: "value",
    seriesField: "recordType",

    legend: {
      itemName: {
        formatter: (item) => {
          return item === "Income"
            ? item +
                ` $${data
                  .filter((item) => item.recordType === "Income")
                  .reduce((sum, item) => sum + item.value, 0)}`
            : item +
                ` $${data
                  .filter((item) => item.recordType === "Expenses")
                  .reduce((sum, item) => sum + item.value, 0)}`;
        },
      },
    },

    //color: ['#1ca9e6', '#f88c24'],

    label: {
      position: "top",
      formatter: (datum) => (datum.value !== 0 ? datum.value : ""),
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
    slider: {
      start: 0,
      end: 1,
    },
  };

  return (
    <>
      <SelectPeriodForRecords
        periods={periods}
        value={period}
        onChange={onChange}
      />
      <Column {...config} />
    </>
  );
}
