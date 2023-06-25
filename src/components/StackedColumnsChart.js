import React from "react";
import ReactApexChart from "react-apexcharts";

function StackedColumnsChart(props) {
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
    colors: ["#E08D79", "#B3F2DD"],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
              color: "#E0EFDE",
            },
          },
        },
      },
    },
    xaxis: {
      categories: xaxisCategories,
      labels: {
        style: {
          colors: ["#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE", "#E0EFDE"],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#E0EFDE"],
        },
      },
    },
    legend: {
      position: "right",
      offsetY: 40,
      labels: {
        colors: ["#E0EFDE"],
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height={475} />
  );
}

export default StackedColumnsChart;
