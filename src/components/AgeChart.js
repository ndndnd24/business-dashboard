import React from "react";
import { Loader, Text } from "@mantine/core";
import StackedColumnsChart from "./StackedColumnsChart";

function AgeChart(props) {
  const { data, isLoaded } = props;

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
      // If the array has 0 or 1 element, no change is needed
      return array;
    }

    const lastItem = array.pop(); // Remove and get the last item
    array.unshift(lastItem); // Add the last item to the beginning of the array

    return array;
  }

  const xaxisMale = countElements(createAgeArray(data, "male"));
  const xaxisFemale = countElements(createAgeArray(data, "female"));

  return (
    <div className="App">
      {!isLoaded ? (
        <div className="loader-container">
          <Loader variant="bars" color="#E08D79" />
          <p>Endpoint loading...</p>
        </div>
      ) : (
        data && (
          <div className="agechart-container">
            <Text color="#E0EFDE" fz="xl">Age Distribution by Gender</Text>
            <StackedColumnsChart
              firstSeriesName={"FEMALE"}
              secondSeriesName={"MALE"}
              firstSeriesData={moveLastItemToFirst(Object.values(xaxisFemale))}
              secondSeriesData={moveLastItemToFirst(Object.values(xaxisMale))}
              xaxisCategories={moveLastItemToFirst(Object.keys(xaxisFemale))}
            />
          </div>
        )
      )}
    </div>
  );
}

export default AgeChart;
