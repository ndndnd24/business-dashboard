import React from "react";
import ReactApexChart from "react-apexcharts";

function SimpleDonut(props) {
  const { chartData, labelData, colorList } = props;

  const series = chartData;
  const options = {
    labels: labelData,
    colors: colorList,
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      labels: {
        colors: ["#FFFFFF"],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
    className="simple-donut-chart-container"
    />
  );
}

export default SimpleDonut;
