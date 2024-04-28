// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// function MonthlyDoughNutChart({ data, labels }) {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");

//     const chart = new Chart(ctx, {
//       type: "doughnut",
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             data: data,
//             backgroundColor: [
//               "#FF6384",
//               "#36A2EB",
//               "#FFCE56",
//               "#4BC0C0",
//               "#9966FF",
//             ],
//           },
//         ],
//       },
//       options: {
//         plugins: {
//           legend: {
//             display: true,
//             position: "right",
//           },
//           tooltip: {
//             callbacks: {
//               label: function (context) {
//                 const label = context.label || "";
//                 const amount = context.raw || 0;
//                 const index = context.dataIndex || 0;
//                 const percentage = (
//                   (amount / data.reduce((a, b) => a + b, 0)) *
//                   100
//                 ).toFixed(2);
//                 return `${label}: ${amount.toFixed(2)} (${percentage}%)`;
//               },
//             },
//           },
//         },
//       },
//     });

//     return () => {
//       chart.destroy();
//     };
//   }, [data, labels]);

//   return <canvas ref={chartRef}></canvas>;
// }

// export default MonthlyDoughNutChart;

import Chart from "react-apexcharts";
import styles from "./MonthlyDoughNutChart.module.css";

function MonthlyDoughNutChart() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || "[]";
  const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || "[]";

  const allTransactions = [...storedExpenses, ...storedIncomes];

  const aggregateTransactionsByMonth = (transactions) => {
    const monthlyData = {};
    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
      if (!monthlyData[month]) {
        monthlyData[month] = {};
      }
      const category = transaction.categoryName;
      if (!monthlyData[month][category]) {
        monthlyData[month][category] = 0;
      }
      monthlyData[month][category] += Number(transaction.transactionAmount);
    });
    return monthlyData;
  };

  const monthlyData = aggregateTransactionsByMonth(allTransactions);
  const months = Object.keys(monthlyData);

  return (
    <div className={styles.monthlyreport}>
      {months.map((month) => (
        <div key={month}>
          <h3 className={styles.chart}>Donut Chart - {month}</h3>
          <div className={styles.monthly}>
            {monthlyData[month] &&
            Object.keys(monthlyData[month]).length > 0 ? (
              <Chart
                type="donut"
                width={450}
                height={350}
                series={Object.values(monthlyData[month])}
                options={{
                  labels: Object.keys(monthlyData[month]),
                  title: {
                    text: "Monthly Report",
                  },
                  subtitle: {
                    text: `Month: ${month}`,
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          fontSize: 16,
                          color: "#432454",
                        },
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                  },
                  responsive: [
                    {
                      breakpoint: 700,
                      options: {
                        chart: {
                          width: "100%",
                          height: "250",
                        },
                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  ],
                }}
              />
            ) : (
              <p>No data available for {month}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MonthlyDoughNutChart;
