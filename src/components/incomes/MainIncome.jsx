import { useState, useEffect } from "react";
import styles from "./MainIncome.module.css";
import AddIncomePopup from "./AddIncomePopup";
import IncomeList from "./IncomeList";

function MainIncome() {
  const [showPopup, setShowPopup] = useState(false);

  const [incomes, setIncomes] = useState(() => {
    const storedIncomes = JSON.parse(localStorage.getItem("incomes"));
    return storedIncomes || [];
  });

  const togglePopup = () => setShowPopup(!showPopup);

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  function handleAddIncome(newIncome) {
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    setShowPopup(false);
  }

  function handleDeleteIncome(index) {
    const updatedIncomes = incomes.filter((income, id) => id !== index);
    setIncomes(updatedIncomes);
  }

  return (
    <>
      <div className={styles.container}>
        <header className={styles.incomeheader}>
          <h2>Incomes</h2>

          <button className={styles.addincome} onClick={togglePopup}>
            Add Income
          </button>
        </header>
        <main className={styles.main}>
          {showPopup && (
            <AddIncomePopup
              onAddIncome={handleAddIncome}
              onClose={togglePopup}
            />
          )}
          <IncomeList
            incomes={incomes}
            handleDeleteIncome={handleDeleteIncome}
          />
        </main>
      </div>
    </>
  );
}

export default MainIncome;
