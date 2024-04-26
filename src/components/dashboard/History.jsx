import { useState, useEffect } from "react";
import Chart from "./Chart.jsx";
import styles from "./History.module.css";
function History() {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    const storedIncomes = JSON.parse(localStorage.getItem("incomes"));
    const combinedTransactions = [...storedExpenses, ...storedIncomes];

    combinedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactionHistory(combinedTransactions);
  }, []);

  return (
    <div className={styles.container}>
      <Chart />

      <div className={styles.recenthistory}>
        <p>Recent History</p>

        {transactionHistory.map((transaction, index) => (
          <div
            key={index}
            className={`${styles.history} ${
              transaction.categoryName.toLowerCase() === "income"
                ? styles.income
                : styles.expense
            }`}
          >
            <p>{transaction.categoryName}</p>
            <span>{`Rs. ${transaction.transactionAmount}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
