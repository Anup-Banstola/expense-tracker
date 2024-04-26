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
console.log("hello");

function Chart() {
  // const expenseData = [
  //   15000, 18000, 16000, 14000, 12000, 10000, 8000, 11000, 13000, 9000, 10000,
  //   13000,
  // ];

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

  // const months = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];

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
    <div>
      <Line data={data} className={styles.chart} />
    </div>
  );
}

export default Chart;
