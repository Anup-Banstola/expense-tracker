import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function MonthlyDoughNutChart({ data, labels }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const amount = context.raw || 0;
                const index = context.dataIndex || 0;
                const percentage = (
                  (amount / data.reduce((a, b) => a + b, 0)) *
                  100
                ).toFixed(2);
                return `${label}: ${amount.toFixed(2)} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data, labels]);

  return <canvas ref={chartRef}></canvas>;
}

export default MonthlyDoughNutChart;
