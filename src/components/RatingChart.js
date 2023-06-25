import React from "react";
import { Text } from "@mantine/core";
import RadialBarChart from "./RadialBarChart";

function RatingChart(props) {
  const { data } = props;

  function createRatingArray(inputData) {
    return inputData.map((element) => element.rating);
  }

  function countElements(inputData) {
    const counts = {};
    for (let i = 0; i < inputData.length; i++) {
      const element = inputData[i];
      counts[element] = (counts[element] || 0) + 1;
    }

    return counts;
  }

  return (
    <div className="component-container">
      <div className="ratingchart-container donut-chart-container">
        <Text color="#FFFFFF" fz="xl" className="chart-title-container">
          Ratings Distribution
        </Text>
        <RadialBarChart
          chartData={Object.values(countElements(createRatingArray(data)))}
          labelData={Object.keys(countElements(createRatingArray(data)))}
          colorList={["#49416D", "#646D89", "#7E9AA5", "#99C6C1", "#B3F2DD"]}
        />
      </div>
    </div>
  );
}

export default RatingChart;
