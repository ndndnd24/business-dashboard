import React from "react";
import ReactApexChart from "react-apexcharts";

function RadialBarChart(props) {
  const { chartData, labelData, colorList } = props;

  function convertToPercentages(inputData) {
    if (inputData.length === 0) {
      return [];
    }

    const maxNumber = Math.max(...inputData);
    const percentages = inputData.map((number) => (number / maxNumber) * 100);

    return percentages;
  }

  const series = convertToPercentages(chartData);
  const options = {
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: colorList,
    labels: labelData,
    legend: {
      show: true,
      floating: true,
      fontSize: "12px",
      position: "left",
      offsetX: 160,
      offsetY: -3,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + chartData[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      //   height={475}
    />
  );
}

export default RadialBarChart;
