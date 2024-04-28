import Chart from "react-apexcharts";
import styles from "./DoughNutChart.module.css";

function DoughNutChart() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || "[]";
  const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || "[]";

  const allTransactions = [...storedExpenses, ...storedIncomes];

  const aggregateTransactionsByDay = (transactions) => {
    const dailyData = {};
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {};
      }
      const category = transaction.categoryName;
      if (!dailyData[date][category]) {
        dailyData[date][category] = 0;
      }
      dailyData[date][category] += Number(transaction.transactionAmount);
    });
    return dailyData;
  };

  const dailyData = aggregateTransactionsByDay(allTransactions);
  const dates = Object.keys(dailyData);

  return (
    <div className={styles.dailyreport}>
      {dates.map((date) => (
        <div key={date}>
          <h3 className={styles.chart}>Donut Chart - {date}</h3>
          <div className={styles.daily}>
            {dailyData[date] && Object.keys(dailyData[date]).length > 0 ? (
              <Chart
                type="donut"
                width={450}
                height={350}
                series={Object.values(dailyData[date])}
                options={{
                  labels: Object.keys(dailyData[date]),
                  title: {
                    text: "Daily Report",
                  },
                  subtitle: {
                    text: `Date: ${date}`,
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            fontSize: 25,
                            color: "#438024",
                          },
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
              <p>No data available for {date}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
export default DoughNutChart;
