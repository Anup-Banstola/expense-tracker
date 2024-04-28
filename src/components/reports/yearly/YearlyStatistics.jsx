import { useEffect, useState } from "react";
import styles from "./YearlyStatistics.module.css";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function YearlyStatistics() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
  const storedIncomes = JSON.parse(localStorage.getItem("incomes"));

  const [yearlyExpenses, setYearlyExpenses] = useState({});
  const [yearlyIncomes, setYearlyIncomes] = useState({});
  const [highestTransaction, setHighestTransaction] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const expensesByYear = storedExpenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const amount = parseFloat(expense.transactionAmount);
      acc[year] = acc[year] ? acc[year] + amount : amount;
      return acc;
    }, {});
    setYearlyExpenses(expensesByYear);

    const incomesByYear = storedIncomes.reduce((acc, income) => {
      const date = new Date(income.date);
      const year = date.getFullYear();
      const amount = parseFloat(income.transactionAmount);
      acc[year] = acc[year] ? acc[year] + amount : amount;
      return acc;
    }, {});
    setYearlyIncomes(incomesByYear);

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
    } else if (Object.keys(yearlyIncomes).length === 0) {
      setRemarks("No income recorded for this year.");
    } else if (Object.keys(yearlyExpenses).length === 0) {
      setRemarks("No expenses recorded for this year.");
    } else if (highestTransaction) {
      setRemarks(
        `Highest transaction amount recorded in ${highestTransaction.date} : Rs.${highestTransaction.transactionAmount}`
      );
    }
  }, []);

  return (
    <div className={styles.yearly}>
      <div>
        <h3>Expenses</h3>
        {Object.entries(yearlyExpenses).map(([year, total]) => (
          <div key={year}>
            Year: {year} --Total Expenses: {formatAmount(total)}
          </div>
        ))}
      </div>
      <div>
        <h3>Incomes</h3>
        {Object.entries(yearlyIncomes).map(([year, total]) => (
          <div key={year}>
            Year: {year} -- Total Income: {formatAmount(total)}
          </div>
        ))}
      </div>
      <div>
        <h3>Remarks</h3>
        <div>{remarks}</div>
      </div>
    </div>
  );
}

export default YearlyStatistics;
