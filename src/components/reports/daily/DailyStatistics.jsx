import { useEffect, useState } from "react";
import styles from "./DailyStatistics.module.css";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function DailyStatistics() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
  const storedIncomes = JSON.parse(localStorage.getItem("incomes"));
  const [dailyExpenses, setDailyExpenses] = useState({});
  const [dailyIncomes, setDailyIncomes] = useState({});
  const [highestTransaction, setHighestTransaction] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const expensesByDay = storedExpenses.reduce((acc, expense) => {
      const date = expense.date;
      const amount = parseFloat(expense.transactionAmount);
      acc[date] = acc[date] ? acc[date] + amount : amount;
      return acc;
    }, {});
    setDailyExpenses(expensesByDay);

    const incomesByDay = storedIncomes.reduce((acc, income) => {
      const date = income.date;
      const amount = parseFloat(income.transactionAmount);
      acc[date] = acc[date] ? acc[date] + amount : amount;
      return acc;
    }, {});
    setDailyIncomes(incomesByDay);

    const allTransactions = [...storedExpenses, ...storedIncomes];
    if (allTransactions.length > 0) {
      const highest = allTransactions.reduce((max, transaction) => {
        const amount = parseFloat(transaction.transactionAmount);
        return amount > parseFloat(max.transactionAmount) ? transaction : max;
      }, allTransactions[0]);
      setHighestTransaction(highest);
    }

    if (storedIncomes.length === 0 && storedExpenses.length === 0) {
      setRemarks("No transactions recorded yet.");
    } else if (Object.keys(dailyIncomes).length === 0) {
      setRemarks("No income recorded for today.");
    } else if (Object.keys(dailyExpenses).length === 0) {
      setRemarks("No expenses recorded for today.");
    } else if (highestTransaction) {
      setRemarks(
        `Highest transaction amount recorded on ${highestTransaction.date}: ${highestTransaction.transactionAmount}`
      );
    }
  }, [remarks]);

  return (
    <div className={styles.dailyreport}>
      <div className={styles.daily}>
        <h3>Expenses</h3>
        {Object.entries(dailyExpenses).map(([date, total]) => (
          <div key={date}>
            Date: {date} - Total Expenses: {formatAmount(total)}
          </div>
        ))}
      </div>

      <div>
        <h3>Incomes</h3>
        {Object.entries(dailyIncomes).map(([date, total]) => (
          <div key={date}>
            Date: {date} - Total Incomes: {formatAmount(total)}
          </div>
        ))}
      </div>
      <div>
        <h3>Highest Transaction</h3>
        {highestTransaction && (
          <div>
            Amount: {formatAmount(highestTransaction.transactionAmount)},
            Category:
            {highestTransaction.categoryName}, Date: {highestTransaction.date}
          </div>
        )}
      </div>
      <div>
        <h3>Remarks</h3>
        <div>{remarks}</div>
      </div>
    </div>
  );
}

export default DailyStatistics;
