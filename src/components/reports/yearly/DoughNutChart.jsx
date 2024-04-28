import Chart from "react-apexcharts";
import styles from "./DoughNutChart.module.css";

function DoughNutChart() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || "[]";
  const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || "[]";

  const allTransactions = [...storedExpenses, ...storedIncomes];

  const aggregateTransactionsByYear = (transactions) => {
    const yearlyData = {};
    transactions.forEach((transaction) => {
      const year = new Date(transaction.date).getFullYear();
      if (!yearlyData[year]) {
        yearlyData[year] = {};
      }
      console.log(yearlyData[year]);
      const category = transaction.categoryName;
      console.log(category);
      if (!yearlyData[year][category]) {
        yearlyData[year][category] = 0;
      }
      console.log(yearlyData[year][category]);
      yearlyData[year][category] += Number(transaction.transactionAmount);
    });
    return yearlyData;
  };

  const yearlyData = aggregateTransactionsByYear(allTransactions);

  const years = Object.keys(yearlyData);
  console.log(years);

  return (
    <div className={styles.yearly}>
      {years.map((year) => (
        <div key={year}>
          <h3 className={styles.chart}>Donut Chart - {year}</h3>
          <div className={styles.daily}>
            {yearlyData[year] && Object.keys(yearlyData[year]).length > 0 ? (
              <Chart
                type="donut"
                width={450}
                height={350}
                series={Object.values(yearlyData[year])}
                options={{
                  labels: Object.keys(yearlyData[year]),
                  title: {
                    text: "Yearly Report",
                  },
                  subtitle: {
                    text: `Year: ${year}`,
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            fontSize: 16,
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
              <p>No data available for {year}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoughNutChart;
