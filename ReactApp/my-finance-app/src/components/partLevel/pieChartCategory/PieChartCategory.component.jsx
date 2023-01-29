// Import third party libraries
import { Pie, Typ } from "../../../imports/ui.imports";

export function PieChartCategory(props) {
  const { data } = props;

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "name",
    radius: 0.75,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    tooltip: {
      formatter: (datum) => ({
        name: `${datum.name}`,
        value: `$ ${datum.value}`,
      }),
    },
  };
  return <Pie {...config} />;
  // return <>{data.length > 0 ? <Pie {...config} /> : null}</>;
}
