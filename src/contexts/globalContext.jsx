import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Create context
const ExpenseIncomeContext = createContext();

// Create provider
export const ExpenseIncomeProvider = ({ children }) => {
  const [storedExpenses, setStoredExpenses] = useState([]);
  const [storedIncomes, setStoredIncomes] = useState([]);

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    setStoredExpenses(expenses);
    setStoredIncomes(incomes);
  }, []);

  const contextValue = useMemo(
    () => ({ storedExpenses, storedIncomes }),
    [storedExpenses, storedIncomes]
  );

  return (
    <ExpenseIncomeContext.Provider value={contextValue}>
      {children}
    </ExpenseIncomeContext.Provider>
  );
};

// Custom hook to use context values
export const useExpenseIncome = () => useContext(ExpenseIncomeContext);
