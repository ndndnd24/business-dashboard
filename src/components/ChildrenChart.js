import React from "react";
import { Text } from "@mantine/core";
import SimpleDonut from "./SimpleDonut";

function ChildrenChart(props) {
  const { data } = props;

  function createChildrenArray(inputData) {
    return inputData.map((element) => element.children);
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
      <div className="childrenchart-container">
        <Text color="#FFFFFF" fz="xl" className="chart-title-container">
          Do they have children?
          {console.log(countElements(createChildrenArray(data)))}
        </Text>
        <SimpleDonut
          chartData={Object.values(countElements(createChildrenArray(data)))}
          labelData={Object.keys(countElements(createChildrenArray(data)))}
          colorList={["#E08D79", "#B3F2DD"]}
        />
      </div>
    </div>
  );
}

export default ChildrenChart;
