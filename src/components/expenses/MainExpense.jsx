import { useEffect, useState } from "react";
import styles from "./MainExpense.module.css";
import AddExpensePopup from "./AddExpensePopup";
import ExpenseList from "./ExpenseList";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function MainExpense() {
  const [showPopup, setShowPopup] = useState(false);
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));

    return storedExpenses || [];
  });

  const [accountBalance, setAccountBalance] = useState();

  useEffect(() => {
    const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const totalIncomes =
      storedIncomes &&
      storedIncomes.reduce(
        (total, income) => total + parseFloat(income.transactionAmount),
        0
      );
    const totalExpenses =
      storedExpenses &&
      storedExpenses.reduce(
        (total, expense) => total + parseFloat(expense.transactionAmount),
        0
      );
    setAccountBalance(totalIncomes - totalExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const togglePopup = () => setShowPopup(!showPopup);

  const [error, setError] = useState("");

  function handleAddExpense(newExpense) {
    const amount = parseFloat(newExpense.transactionAmount);
    if (isNaN(amount)) {
      alert("Invalid amount. Please enter a valid number.");
    }
    if (accountBalance >= amount) {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

      const newBalance = accountBalance - amount;
      setAccountBalance(newBalance);

      setShowPopup(false);
    } else {
      alert("Insufficient balance to add this expense.");
      setShowPopup(false);
    }
  }

  function handleDeleteExpense(index) {
    const deletedExpense = expenses[index];
    const updatedExpenses = expenses.filter((expense, id) => id !== index);
    setExpenses(updatedExpenses);
    const deletedAmount = parseFloat(deletedExpense.transactionAmount);
    const newBalance = accountBalance + deletedAmount;
    setAccountBalance(newBalance);
  }

  return (
    <>
      <div className={styles.container}>
        <header className={styles.expenseheader}>
          <h2>Expenses</h2>

          <button onClick={togglePopup} className={styles.addexpense}>
            Add new expense
          </button>
        </header>
        <main className={styles.main}>
          {showPopup && (
            <AddExpensePopup
              onClose={togglePopup}
              onAddExpense={handleAddExpense}
            />
          )}
          <ExpenseList
            expenses={expenses}
            handleDeleteExpense={handleDeleteExpense}
          />
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.balance}>
            Current Balance:{formatAmount(accountBalance)}
          </div>
        </main>
      </div>
    </>
  );
}

export default MainExpense;
