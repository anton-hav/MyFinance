import React, { useState, useEffect } from "react";

// Import third party libraries
import { Pie } from "../../../imports/ui.imports";

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
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <>{data.length > 0 ? <Pie {...config} /> : null}</>;
}
