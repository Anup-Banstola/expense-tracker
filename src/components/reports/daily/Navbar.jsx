import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
function Navbar() {
  return (
    <div>
      <h2 className={styles.report}>Reports</h2>
      <div className={styles.header}>
        <NavLink to="/reports/dailyreport">
          <span className={styles.daily}>Daily</span>
        </NavLink>
        <NavLink to="/reports/monthlyreport">
          <span className={styles.monthly}>Monthly</span>
        </NavLink>
        <NavLink to="/reports/yearlyreport">
          <span className={styles.yearly}>Yearly</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
