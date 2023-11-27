import * as React from "react";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";

import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";

const series = [
  {
    type: "line",
    yAxisKey: "er",
    color: "red",
    data: [10, 15, 30, 50, 100],
  },
];

export default function Combining() {
  return (
    <ChartContainer
      series={series}
      width={500}
      height={400}
      xAxis={[
        {
          id: "Content Influencer",
          data: [
            "Content 1",
            "Content 2",
            "Content 3",
            "Content 4",
            "Next Content",
          ],
          scaleType: "band",
          valueFormatter: (value) => value.toString(),
        },
      ]}
      yAxis={[
        {
          id: "er",
          scaleType: "log",
        },
      ]}
    >
      <LinePlot />
      <ChartsXAxis
        label="Content Influencer"
        position="bottom"
        axisId="Content Influencer"
      />
      <ChartsYAxis label="Engagement Rate" position="left" axisId="er" />
    </ChartContainer>
  );
}
