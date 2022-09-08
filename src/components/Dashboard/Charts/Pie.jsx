import ReactApexChart from "react-apexcharts";
import styles from "./Pie.module.scss";
import { data, categories } from "../../../Service/data";

const Pie = () => {
  const chartData = {
    series: data,
    options: {
      chart: {
        width: "100%",
        type: "pie",
      },
      labels: categories,
      theme: {
        monochrome: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + "%"];
        },
      },
      legend: {
        show: false,
      },
    },
  };

  return (
    <div className={styles.chart}>
      <div className={styles.canvas_wrapper}>
        <ReactApexChart
          series={chartData.series}
          options={chartData.options}
          type="pie"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Pie;
