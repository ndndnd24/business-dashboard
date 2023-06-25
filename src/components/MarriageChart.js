import React from "react";
import { Text } from "@mantine/core";
import SplineChart from "./SplineChart";

function MarriageChart(props) {
  const { data } = props;

  function calculateAverageYearsMarriedByAge(inputData, gender) {
    const averages = {};
    inputData.forEach((element) => {
      const age = element.age;
      const yearsMarried = element.yearsmarried;
      if (element.gender === gender) {
        if (!averages[age]) {
          averages[age] = { sum: yearsMarried, count: 1 };
        } else {
          averages[age].sum += yearsMarried;
          averages[age].count++;
        }
      }
    });
    for (const age in averages) {
      averages[age] = +((averages[age].sum / averages[age].count).toFixed(2));
    }

    return averages;
  }

  function moveLastItemToFirst(array) {
    if (array.length <= 1) {
      return array;
    }

    const lastItem = array.pop();
    array.unshift(lastItem);
    return array;
  }

  const xaxisMale = calculateAverageYearsMarriedByAge(data, "male");
  const xaxisFemale = calculateAverageYearsMarriedByAge(data, "female");

  return (
    <div className="component-container">
      <div className="mariagechart-container">
        <Text color="#FFFFFF" fz="xl" className="chart-title-container">
          Average Marriage Time by Age
        </Text>
        <SplineChart
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

export default MarriageChart;
