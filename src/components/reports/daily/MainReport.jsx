import DailyStatistics from "./DailyStatistics";
import DailyDoughNutChart from "./DoughNutChart";
import Navbar from "./Navbar";
import styles from "./MainReport.module.css";

function MainReport() {
  return (
    <div className={styles.dailyreport}>
      <Navbar />
      <DailyStatistics />
      <DailyDoughNutChart />
    </div>
  );
}

export default MainReport;
