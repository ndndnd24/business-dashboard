import React from "react";
import { Text } from "@mantine/core";
import SimpleDonut from "./SimpleDonut";

function GenderChart(props) {
  const { data } = props;

  function createGenderArray(inputData) {
    return inputData.map((element) => element.gender);
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
      <div className="genderchart-container">
        <Text color="#FFFFFF" fz="xl" className="chart-title-container">
          Gender Distribution
        </Text>
        <SimpleDonut
          chartData={Object.values(countElements(createGenderArray(data)))}
          labelData={Object.keys(countElements(createGenderArray(data)))}
          colorList={["#B3F2DD", "#E08D79"]}
        />
      </div>
    </div>
  );
}

export default GenderChart;
