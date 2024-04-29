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
    console.log(combinedTransactions);
  }, []);

  return (
    <div className={styles.container}>
      <Chart />

      <div className={styles.recenthistory}>
        <span>Recent History</span>
        <div className={styles.tranhistory}>
          {transactionHistory.slice(0, 3).map((transaction, index) => (
            <div
              key={index}
              className={`${styles.history} ${
                transaction.description.toLowerCase() === "income"
                  ? styles.income
                  : styles.expense
              }`}
            >
              <span>{transaction.categoryName}</span>
              <span>{`Rs. ${transaction.transactionAmount}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
