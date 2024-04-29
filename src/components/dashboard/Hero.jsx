import { useState, useEffect } from "react";
import Button from "./Button.jsx";

import styles from "./Hero.module.css";
import History from "./History.jsx";

function Hero() {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);

  const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || "[]";
  const storedIncomes = JSON.parse(localStorage.getItem("incomes")) || "[]";
  console.log(storedExpenses);

  useEffect(() => {
    if (storedExpenses && storedExpenses.length > 0) {
      const total = storedExpenses.reduce((total, expense) => {
        const amount = parseFloat(expense.transactionAmount);
        return total + amount;
      }, 0);
      setTotalExpenses(total.toFixed(2));
    } else {
      setTotalExpenses("0.00");
    }
  }, [storedExpenses]);

  useEffect(() => {
    if (storedIncomes && storedIncomes.length > 0) {
      const total = storedIncomes.reduce((total, income) => {
        const amount = parseFloat(income.transactionAmount);

        return total + amount;
      }, 0);
      setTotalIncomes(total.toFixed(2));
    } else {
      setTotalIncomes("0.00");
    }
  }, [storedIncomes]);

  const formattedTotalBalance = parseFloat(
    totalIncomes - totalExpenses
  ).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const formattedTotalIncomes = parseFloat(totalIncomes).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }
  );

  const formattedTotalExpenses = parseFloat(totalExpenses).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }
  );

  return (
    <>
      <main className={styles.hero}>
        <h2 className={styles.dash}>Dashboard</h2>

        <div className={styles.amounts}>
          <div className={styles.balance}>
            <h2>Total Balance</h2>
            <p className={styles.bal}>Rs.{formattedTotalBalance}</p>
          </div>
          <div className={styles.income}>
            <h2>Total Incomes</h2>
            <p className={styles.inc}>Rs.{formattedTotalIncomes}</p>
          </div>
          <div className={styles.expense}>
            <h2>Total Expenses</h2>
            <p className={styles.exp}>Rs.{formattedTotalExpenses}</p>
          </div>
        </div>

        {/*<div className={styles.btns}>
          <Button className="totalbal">
            <p>Total Balance</p>
            <h2>Rs. {formattedTotalBalance}</h2>
          </Button>
          <Button className="totalinc">
            <p>Total Incomes</p>
            <h2>Rs. {formattedTotalIncomes}</h2>
          </Button>
          <Button className="totalexp">
            <p>Total Expenses</p>
            <h2>Rs. {formattedTotalExpenses}</h2>
          </Button>


          
  </div>*/}

        <p className={styles.overview}>Overview</p>

        <History />
      </main>
    </>
  );
}

export default Hero;
