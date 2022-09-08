import ReactApexChart from "react-apexcharts";
import styles from "./Columns.module.scss";
import { data, categories } from "../../../Service/data";

const Columns = () => {
  const chartData = {
    series: [{ data }],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      colors: ["#999BF5"],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    },
  };

  return (
    <div className={styles.chart}>
      <div className={styles.canvas_wrapper}>
        <ReactApexChart
          series={chartData.series}
          options={chartData.options}
          type="bar"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default Columns;
