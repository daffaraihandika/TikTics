import React, { useState, useEffect } from "react";
import axios from "axios";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { useParams } from "react-router-dom";

export default function Combining() {
  const [engagement, setEngagement] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    getPrediksiER();
  }, [username]);

  const getPrediksiER = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/statistic-prediction/${username}`
      );
      setEngagement(response.data.engagement_rates);
      console.log("Engagement Rate : ", response.data.engagement_rates);
    } catch (error) {
      console.error(error);
    }
  };

  const isDataValid = Array.isArray(engagement) && engagement.length > 0;

  const series = isDataValid
    ? [
        {
          type: "line",
          yAxisKey: "er",
          color: "red",
          data: engagement,
        },
      ]
    : [];

  return isDataValid ? (
    <ChartContainer
      series={series}
      width={1300}
      height={600}
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
          scaleType: "linear", // Use linear scale for engagement rates
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
  ) : (
    <div>Loading or invalid data...</div>
  );
}
