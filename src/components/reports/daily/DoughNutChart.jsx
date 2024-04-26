// import React from "react";
// import { Doughnut } from "react-chartjs-2";

// function DoughNutChart({ expenses = {}, incomes = {} }) {
//   // Calculate total expenses and incomes

//   const safeExpenses = expenses || {};
//   const safeIncomes = incomes || {};

//   const totalExpenses = Object.values(safeExpenses).reduce((a, b) => a + b, 0);
//   const totalIncomes = Object.values(safeIncomes).reduce((a, b) => a + b, 0);
//   const total = totalExpenses + totalIncomes;

//   // Prepare data for the chart
//   const data = {
//     labels: ["Expenses", "Incomes"],
//     datasets: [
//       {
//         data: [totalExpenses, totalIncomes],
//         backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
//         borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       datalabels: {
//         formatter: (value, ctx) => {
//           let sum = 0;
//           let dataArr = ctx.chart.data.datasets[0].data;
//           dataArr.map((data) => {
//             sum += data;
//           });
//           let percentage = ((value * 100) / sum).toFixed(2) + "%";
//           return percentage;
//         },
//         color: "#fff",
//       },
//     },
//   };

//   // Render the donut chart
//   return <Doughnut data={data} options={options} />;
// }

// export default DoughNutChart;

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function DoughNutChart() {
  return (
    <>
      <h3>Donut Chart</h3>
      <Chart
        type="donut"
        width={650}
        height={350}
        series={[40, 45, 48, 25, 30]}
        options={{
          labels: ["salary", "rent", "education", "entertainment", "medicine"],
        }}
      />
    </>
  );
}
export default DoughNutChart;
