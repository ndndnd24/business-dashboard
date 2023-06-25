import React from "react";
import ReactApexChart from "react-apexcharts";

function BarWithNegativeValuesChart(props) {
  const {
    firstSeriesName,
    secondSeriesName,
    firstSeriesData,
    secondSeriesData,
    xaxisCategories,
  } = props;

  function convertToNegative(inputArray) {
    const negativeArray = inputArray.map((number) => -number);
    return negativeArray;
  }

  const series = [
    {
      name: firstSeriesName,
      data: firstSeriesData,
    },
    {
      name: secondSeriesName,
      data: convertToNegative(secondSeriesData),
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 440,
      stacked: true,
    },
    colors: ["#E08D79", "#B3F2DD"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: -100,
      max: 100,
      title: {
        text: 'Age (years)',
        style: {
            color: "#E0EFDE"
        }
      },
      labels: {
        style: {
          colors: ["#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE"],
        },
      },
    },
    legend: {
      labels: {
        colors: ["#E0EFDE"],
      },
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val;
        },
      },
      y: {
        formatter: function (val) {
          return Math.abs(val);
        },
      },
    },
    // title: {
    //   text: "Mauritius population pyramid 2011",
    // },
    xaxis: {
      categories: xaxisCategories,
      title: {
        text: "Person",
        style: {
            color: "#E0EFDE"
        }
      },
      labels: {
        formatter: function (val) {
          return Math.abs(Math.round(val));
        },
        style: {
          colors: ["#E0EFDE"],
        },
      },
    },
  };

  return <ReactApexChart options={options} series={series} type="bar" />;
}

export default BarWithNegativeValuesChart;
