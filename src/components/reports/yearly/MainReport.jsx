import Navbar from "../daily/Navbar";
import DoughNutChart from "./DoughNutChart";
import YearlyStatistics from "./YearlyStatistics";
import styles from "./MainReport.module.css";

function MainReport() {
  return (
    <div className={styles.yearlyreport}>
      <Navbar />
      <YearlyStatistics />
      <DoughNutChart />
    </div>
  );
}

export default MainReport;
