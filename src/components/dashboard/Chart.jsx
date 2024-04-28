import styles from "./Chart.module.css";

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,

  Legend,
  ArcElement
);

function Chart() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  const expenseData = storedExpenses.map((transaction) =>
    parseFloat(transaction.transactionAmount)
  );
  const storedIncomes = JSON.parse(localStorage.getItem("incomes") || "[]");
  const incomeData = storedIncomes.map((transaction) =>
    parseFloat(transaction.transactionAmount)
  );
  console.log(storedExpenses);
  console.log(expenseData);

  const expenseMonths = new Set(
    storedExpenses.map((transaction) => transaction.date.split("-")[1])
  );
  const incomeMonths = new Set(
    storedIncomes.map((transaction) => transaction.date.split("-")[1])
  );

  const allMonths = new Set([...expenseMonths, ...incomeMonths]);
  const sortedMonths = Array.from(allMonths).sort(
    (a, b) => new Date(`2000-${a}-01`) - new Date(`2000-${b}-01`)
  );

  const data = {
    labels: sortedMonths,

    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "rgba(254,37,37)",
        backgroundColor: "rgba(254,37,37,0.2)",

        cubicInterpolationMode: "monotone",
      },
      {
        label: "Incomes",
        data: incomeData,
        borderColor: "rgba(20, 128, 76)",
        backgroundColor: "rgba(20, 128, 76,0.2)",
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  return (
    <div className={styles.chartContainer}>
      <Line data={data} className={styles.chart} />
    </div>
  );
}
export default Chart;

// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";

// function Graph() {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
//     const storedIncomes = JSON.parse(localStorage.getItem("incomes") || "[]");
//     const expenseData = storedExpenses.map((transaction) => ({
//       x: transaction.date,
//       y: parseFloat(transaction.transactionAmount),
//     }));
//     const incomeData = storedIncomes.map((transaction) => ({
//       x: transaction.date,
//       y: parseFloat(transaction.transactionAmount),
//     }));

//     console.log("Expense Data:", expenseData);
//     console.log("Income Data:", incomeData);
//   }, []);
//   //   setChartData({
//   //     series: [
//   //       {
//   //         name: "Expenses",
//   //         data: expenseData,
//   //       },
//   //       {
//   //         name: "Incomes",
//   //         data: incomeData,
//   //       },
//   //     ],
//   //   });
//   // }, []);

//   // const options = {
//   //   chart: {
//   //     type: "line",
//   //     height: 350,
//   //   },
//   //   xaxis: {
//   //     type: "category",
//   //   },
//   //   colors: ["#FE2525", "#14804C"],
//   // };

//   return (
//     <div>
//       <Chart type="line" width={750} height={350} />
//     </div>
//   );
// }

// export default Graph;
