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
          colorList={["#E08D79", "#D5A692", "#CAC0AB", "#BED9C4", "#B3F2DD"]}
        />
      </div>
    </div>
  );
}

export default RatingChart;
