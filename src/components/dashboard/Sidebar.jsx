import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
function Sidebar() {
  {
    /*const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };*/
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/*<button className={styles.toggleButton} onClick={toggleSidebar}>
        {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
  </button>*/}
      <div className={styles.sidebar}>
        <div className={styles.logotitle}>
          <img
            src="../../assets/icons/logo.svg"
            alt="logo"
            title="Expense Tracker"
          />
          <h2 className={styles.title}>Expense Tracker</h2>
        </div>
        {isSmallScreen ? (
          <FontAwesomeIcon
            icon={faHouse}
            className={styles.icon}
            title="MANAGE"
          />
        ) : (
          // <img
          //   src="../../assets/icons/home.svg"
          //   alt="report-icon"
          //   height="25px"
          // />
          <p className={styles.mng}>Manage</p>
        )}

        <div className={styles.nav}>
          <NavLink to="/" className={styles.navel} title="Dashboard">
            <img src="../../assets/icons/dashboard.svg" alt="dashboard" />
            <span className={styles.text}>Dashboard</span>
          </NavLink>
          <NavLink to="/categories" className={styles.navel} title="Categories">
            <img
              src="../../assets/icons/categories.svg"
              alt="categories"
              height="25px"
            />
            <span className={styles.text}>Categories</span>
          </NavLink>
          <NavLink to="/expenses" className={styles.navel} title="Expenses">
            <img
              src="../../assets/icons/expense.svg"
              alt="expense-icon"
              height="25px"
            />
            <span className={styles.text}>Expenses</span>
          </NavLink>
          <NavLink to="/incomes" className={styles.navel} title="Incomes">
            <img
              src="../../assets/icons/incomes.svg"
              alt="income-icon"
              height="25px"
            />
            <span className={styles.text}>Incomes</span>
          </NavLink>
          <NavLink to="/reports" className={styles.navel} title="Reports">
            <img
              src="../../assets/icons/reports.svg"
              alt="report-icon"
              height="25px"
            />

            <span className={styles.text}>Reports</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
