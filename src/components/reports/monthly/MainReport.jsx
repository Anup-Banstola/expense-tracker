import Navbar from "../daily/Navbar";
import MonthlyStatistics from "./MonthlyStatistics";
import styles from "./MainReport.module.css";
import MonthlyDoughNutChart from "./MonthlyDoughNutChart";

function MainReport() {
  return (
    <div className={styles.monthlyreport}>
      <Navbar />
      <MonthlyStatistics />
      <MonthlyDoughNutChart />
    </div>
  );
}

export default MainReport;
