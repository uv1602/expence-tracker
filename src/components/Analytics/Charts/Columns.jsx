import ReactApexChart from "react-apexcharts";
import styles from "./Columns.module.scss";
import React, { useEffect, useState } from "react";

const Columns = ({ data, categories }) => {
  const [bar, setBar] = useState([]);
  useEffect(() => {
    categories(setBar);
  }, []);
  const chartData = {
    series: bar.price,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        events: {
          click: (event, chartContext, config) => {
            console.log("hi", event, chartContext, config);
          },
          dataPointSelection: (e, chart, options) => {
            console.log(e, chart, options);
          },
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
        categories: bar.categories,
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
      <div className={styles.title}>
        <h2>Average Expences Monthly</h2>
        <h3>Bar Charts</h3>
      </div>
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
