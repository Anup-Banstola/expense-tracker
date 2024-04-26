import DailyStatistics from "./DailyStatistics";
import DoughNutChart from "./DoughNutChart";
import Navbar from "./Navbar";

function MainReport() {
  return (
    <div>
      <Navbar />
      <DailyStatistics />
      <DoughNutChart />
    </div>
  );
}

export default MainReport;
