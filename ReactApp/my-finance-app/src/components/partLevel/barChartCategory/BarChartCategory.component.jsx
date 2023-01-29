// Import third party libraries
import { Bar } from "../../../imports/ui.imports";

export function BarChartCategory(props) {
  const { data } = props;

  const config = {
    data,
    xField: "value",
    yField: "name",
    seriesField: "name",
    legend: {
      position: "top-left",
    },
  };
  return <Bar {...config} />;
}
