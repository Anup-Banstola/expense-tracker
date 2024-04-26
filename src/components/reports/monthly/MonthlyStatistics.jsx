import { useEffect, useState } from "react";
import styles from "./MonthlyStatistics.module.css";
import MonthlyDoughNutChart from "./MonthlyDoughNutChart";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function MonthlyStatistics() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
  const storedIncomes = JSON.parse(localStorage.getItem("incomes"));

  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [monthlyIncomes, setMonthlyIncomes] = useState({});
  const [highestTransaction, setHighestTransaction] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const expensesByMonth = storedExpenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const key = `${year}-${month}`;
      const amount = parseFloat(expense.transactionAmount);
      acc[key] = acc[key] ? acc[key] + amount : amount;
      return acc;
    }, {});
    setMonthlyExpenses(expensesByMonth);

    const incomesByMonth = storedIncomes.reduce((acc, income) => {
      const date = new Date(income.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const key = `${year}-${month}`;
      const amount = parseFloat(income.transactionAmount);
      acc[key] = acc[key] ? acc[key] + amount : amount;
      return acc;
    }, {});
    setMonthlyIncomes(incomesByMonth);

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
    } else if (Object.keys(monthlyIncomes).length === 0) {
      setRemarks("No income recorded for this month.");
    } else if (Object.keys(monthlyExpenses).length === 0) {
      setRemarks("No expenses recorded for today.");
    } else if (highestTransaction) {
      setRemarks(
        `Highest transaction amount recorded in ${highestTransaction.date}: Rs.${highestTransaction.transactionAmount}`
      );
    }
  }, [
    storedExpenses,
    storedIncomes,
    monthlyExpenses,
    monthlyIncomes,
    highestTransaction,
  ]);

  return (
    <div className={styles.monthly}>
      <div>
        <h3>Expenses</h3>
        {Object.entries(monthlyExpenses).map(([month, total]) => (
          <div key={month}>
            Month: {month} - TotalExpenses: {formatAmount(total)}
          </div>
        ))}
      </div>
      <div>
        <h3>Incomes</h3>
        {Object.entries(monthlyIncomes).map(([month, total]) => (
          <div key={month}>
            Month: {month} - Total Income: {formatAmount(total)}
          </div>
        ))}
      </div>
      <div>
        <h3>Highest Transaction</h3>
        {highestTransaction && (
          <div>
            Amount: {highestTransaction.transactionAmount}, Category:{" "}
            {highestTransaction.categoryName}, Date: {highestTransaction.date}
          </div>
        )}
      </div>
      <div>
        <h3>Remarks</h3>
        <div>{remarks}</div>
      </div>

      <div>
        <h3>Expenses</h3>
        {Object.values(monthlyExpenses).length > 0 && (
          <MonthlyDoughNutChart
            data={Object.values(monthlyExpenses)}
            labels={Object.keys(monthlyExpenses)}
          />
        )}
      </div>
      <div>
        <h3>Incomes</h3>
        {Object.values(monthlyIncomes).length > 0 && (
          <MonthlyDoughNutChart
            data={Object.values(monthlyIncomes)}
            labels={Object.keys(monthlyIncomes)}
          />
        )}
      </div>
    </div>
  );
}

export default MonthlyStatistics;
