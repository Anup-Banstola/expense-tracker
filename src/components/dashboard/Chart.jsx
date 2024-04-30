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

  // const expenseMonths = new Set(
  //   storedExpenses.map((transaction) => transaction.date.split("-")[1])
  // );
  // const incomeMonths = new Set(
  //   storedIncomes.map((transaction) => transaction.date.split("-")[1])
  // );

  // const allMonths = new Set([...expenseMonths, ...incomeMonths]);
  // console.log(allMonths);
  // const sortedMonths = Array.from(allMonths).sort(
  //   (a, b) => a - b
  //   // new Date(`2000-${a}-01`) - new Date(`2000-${b}-01`)
  // );
  // console.log(sortedMonths);

  // const expensesByMonth = storedExpenses.reduce((acc, expense) => {
  //   const date = new Date(expense.date);
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   const key = `${year}-${month}`;
  //   const amount = parseFloat(expense.transactionAmount);
  //   acc[key] = acc[key] ? acc[key] + amount : amount;
  //   return acc;
  // }, {});

  // const incomesByMonth = storedIncomes.reduce((acc, income) => {
  //   const date = new Date(income.date);
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   const key = `${year}-${month}`;
  //   const amount = parseFloat(income.transactionAmount);
  //   acc[key] = acc[key] ? acc[key] + amount : amount;
  //   return acc;
  // }, {});

  const expenseMonths = storedExpenses.map((transaction) =>
    new Date(transaction.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  );
  const incomeMonths = storedIncomes.map((transaction) =>
    new Date(transaction.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  );

  // Combine all months and sort them
  const allMonthsSet = new Set([...expenseMonths, ...incomeMonths]);
  console.log(allMonthsSet);

  const sortedMonths = Array.from(allMonthsSet).sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");

    // Compare years first
    if (yearA !== yearB) {
      return yearA - yearB;
    }

    // If years are equal, compare months
    const monthOrder = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    return monthOrder[monthA] - monthOrder[monthB];
  });

  console.log(sortedMonths);

  // Initialize data objects for expenses and incomes
  const expensesByMonth = {};
  const incomesByMonth = {};

  // Populate data objects with summed amounts for each month
  storedExpenses.forEach((expense) => {
    const month = new Date(expense.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    expensesByMonth[month] =
      (expensesByMonth[month] || 0) + parseFloat(expense.transactionAmount);
  });

  storedIncomes.forEach((income) => {
    const month = new Date(income.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    incomesByMonth[month] =
      (incomesByMonth[month] || 0) + parseFloat(income.transactionAmount);
  });

  // Create dataset for expenses
  const expenseData = sortedMonths.map((month) => expensesByMonth[month] || 0);

  // Create dataset for incomes
  const incomeData = sortedMonths.map((month) => incomesByMonth[month] || 0);

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
