import styles from "./ExpenseList.module.css";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function ExpenseList({ expenses, handleDeleteExpense }) {
  return (
    <div className={styles.expenseitem}>
      {expenses &&
        expenses.map((expense, index) => (
          <div key={index} className={styles.expenselist}>
            <div className={styles.transaction}>
              <div>Amount: {formatAmount(expense.transactionAmount)}</div>
              <div>Category: {expense.categoryName}</div>
              <div className={styles.description}>
                Description:
                <div className={styles.wraptext}>{expense.description}</div>
              </div>
            </div>
            <div className={styles.date}>
              <span
                className={styles.deletebtn}
                onClick={() => handleDeleteExpense(index)}
              >
                X
              </span>
              <div>Date: {expense.date}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ExpenseList;
