import React from "react";
import { Text } from "@mantine/core";
import StackedColumnsChart from "./StackedColumnsChart";

function AgeChart(props) {
  const { data } = props;

  function createAgeArray(inputData, gender) {
    return inputData.map((element) =>
      element.gender === gender ? element.age : null
    );
  }

  function countElements(inputData) {
    const counts = {};

    for (let i = 0; i < inputData.length; i++) {
      if (inputData[i] != null) {
        const element = inputData[i];
        counts[element] = (counts[element] || 0) + 1;
      }
    }

    return counts;
  }

  function moveLastItemToFirst(array) {
    if (array.length <= 1) {
      return array;
    }

    const lastItem = array.pop();
    array.unshift(lastItem);
    return array;
  }

  const xaxisMale = countElements(createAgeArray(data, "male"));
  const xaxisFemale = countElements(createAgeArray(data, "female"));

  return (
    <div className="component-container">
      <div className="agechart-container">
        <Text color="#E0EFDE" fz="xl" className="chart-title-container">
          Age Distribution by Gender
        </Text>
        <StackedColumnsChart
          firstSeriesName={"FEMALE"}
          secondSeriesName={"MALE"}
          firstSeriesData={moveLastItemToFirst(Object.values(xaxisFemale))}
          secondSeriesData={moveLastItemToFirst(Object.values(xaxisMale))}
          xaxisCategories={moveLastItemToFirst(Object.keys(xaxisFemale))}
        />
      </div>
    </div>
  );
}

export default AgeChart;
