import React from "react";
import { Text } from "@mantine/core";
import RadialBarChart from "./RadialBarChart";

function ReligiousnessChart(props) {
  const { data } = props;

  function createReligiousnessArray(inputData) {
    return inputData.map((element) => element.religiousness);
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
      <div className="religiousnesschart-container donut-chart-container">
        <Text color="#FFFFFF" fz="xl" className="chart-title-container">
          Religiousness
        </Text>
        <RadialBarChart
          chartData={Object.values(
            countElements(createReligiousnessArray(data))
          )}
          labelData={Object.keys(countElements(createReligiousnessArray(data)))}
          colorList={["#49416D", "#6F5470", "#956773", "#BA7A76", "#E08D79"]}
        />
      </div>
    </div>
  );
}

export default ReligiousnessChart;
