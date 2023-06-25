import React from "react";
import ReactApexChart from "react-apexcharts";

function SplineChart(props) {
  const {
    firstSeriesName,
    secondSeriesName,
    firstSeriesData,
    secondSeriesData,
    xaxisCategories,
  } = props;

  const series = [
    {
      name: firstSeriesName,
      data: firstSeriesData,
    },
    {
      name: secondSeriesName,
      data: secondSeriesData,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    colors: ["#E08D79", "#B3F2DD"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    legend: {
      labels: {
        colors: ["#E0EFDE"],
      },
    },
    yaxis: {
      title: {
        text: "Average Marriage Time (years)",
        style: {
          color: "#E0EFDE",
        },
      },
      labels: {
        style: {
          colors: ["#E0EFDE"],
        },
      },
    },
    xaxis: {
      categories: xaxisCategories,
      title: {
        text: "Age (years)",
        style: {
          color: "#E0EFDE",
        },
      },
      labels: {
        style: {
          colors: [
            "#E0EFDE",
            "#E0EFDE",
            "#E0EFDE",
            "#E0EFDE",
            "#E0EFDE",
            "#E0EFDE",
            "#E0EFDE",
            "#E0EFDE",
            "#E0EFDE",
          ],
        },
      },
    },
  };
  return <ReactApexChart options={options} series={series} type="line" />;
}

export default SplineChart;
