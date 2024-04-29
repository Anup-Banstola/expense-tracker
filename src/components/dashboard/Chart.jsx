import { Line } from "react-chartjs-2";
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
  const storedIncomes = JSON.parse(localStorage.getItem("incomes") || "[]");

  const expenseMonths = new Set(
    storedExpenses.map((transaction) => transaction.date.split("-")[1])
  );
  const incomeMonths = new Set(
    storedIncomes.map((transaction) => transaction.date.split("-")[1])
  );

  const allMonths = new Set([...expenseMonths, ...incomeMonths]);
  const sortedMonths = Array.from(allMonths).sort(
    (a, b) => new Date(`2000-${b}-01`) - new Date(`2000-${a}-01`)
  );

  const expensesByMonth = storedExpenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${year}-${month}`;
    const amount = parseFloat(expense.transactionAmount);
    acc[key] = acc[key] ? acc[key] + amount : amount;
    return acc;
  }, {});
  const incomesByMonth = storedIncomes.reduce((acc, income) => {
    const date = new Date(income.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${year}-${month}`;
    const amount = parseFloat(income.transactionAmount);
    acc[key] = acc[key] ? acc[key] + amount : amount;
    return acc;
  }, {});

  const data = {
    labels: sortedMonths,

    datasets: [
      {
        label: "Expenses",
        data: expensesByMonth,
        borderColor: "rgba(254,37,37)",
        backgroundColor: "rgba(254,37,37,0.2)",

        cubicInterpolationMode: "monotone",
      },
      {
        label: "Incomes",
        data: incomesByMonth,
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

// import { Line } from "react-chartjs-2";
// import styles from "./Chart.module.css";

// function Chart() {
//   const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
//   const storedIncomes = JSON.parse(localStorage.getItem("incomes") || "[]");

//   // Function to aggregate transactions by month
//   const aggregateTransactionsByMonth = (transactions) => {
//     return transactions.reduce((acc, transaction) => {
//       const month = transaction.date.split("-")[1];
//       acc[month] = acc[month] || { income: 0, expense: 0 };
//       if (transaction.description === "income") {
//         acc[month].income += parseFloat(transaction.transactionAmount);
//       } else {
//         acc[month].expense += parseFloat(transaction.transactionAmount);
//       }
//       return acc;
//     }, {});
//   };

//   // Aggregate transactions for both expenses and incomes
//   const monthlyData = {
//     ...aggregateTransactionsByMonth(storedExpenses),
//     ...aggregateTransactionsByMonth(storedIncomes),
//   };

//   // Get unique months
//   const months = Object.keys(monthlyData).sort();

//   // Prepare data for chart
//   const data = {
//     labels: months,
//     datasets: [
//       {
//         label: "Expenses",
//         data: months.map((month) => monthlyData[month]?.expense || 0),
//         borderColor: "rgba(254,37,37)",
//         backgroundColor: "rgba(254,37,37,0.2)",
//         cubicInterpolationMode: "monotone",
//       },
//       {
//         label: "Incomes",
//         data: months.map((month) => monthlyData[month]?.income || 0),
//         borderColor: "rgba(20, 128, 76)",
//         backgroundColor: "rgba(20, 128, 76,0.2)",
//         cubicInterpolationMode: "monotone",
//       },
//     ],
//   };

//   return (
//     <div className={styles.chartContainer}>
//       <Line data={data} className={styles.chart} />
//     </div>
//   );
// }

// export default Chart;

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
