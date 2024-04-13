import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PlotChart = ({ yaxis, xaxis }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Extracting data from the datasets
      const yLabels = yaxis.map((data) => data.Label);
      const yValues = yaxis.map((data) => parseFloat(data.RandomNumber));
      const xLabels = xaxis.map((data) => data.Label);
      const xValues = xaxis.map((data) => parseFloat(data.RandomNumber));

      // Creating the chart
      chartInstance.current = new Chart(ctx, {
        type: "scatter",
        data: {
          labels: xValues,
          datasets: [
            {
              label: "Data(x,y)",
              data: yValues.map((value, index) => ({
                x: xValues[index],
                y: value,
              })),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              display: true,
              text: "xcor",
            },
            y: {
              type: "linear",
              position: "left",
              display: true,
              text: "ycor",
            },
          },
        },
      });
    }
  }, [yaxis, xaxis]);

  return <canvas ref={chartRef} />;
};

export default PlotChart;
