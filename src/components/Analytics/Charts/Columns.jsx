import ReactApexChart from "react-apexcharts";
import styles from "./Columns.module.scss";
import { data, categories } from "../../../Service/data";
import { useEffect, useRef, useState } from "react";

const Columns = () => {
  const [isEdit, setIsEdit] = useState();
  const refTest = useRef();

  useEffect(() => {
    console.log("hi", refTest.current);
  }, [refTest.current]);
  const chartData = {
    series: [{ data }],
    options: {
      chart: {
        toolbar: {
          show: true,
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
          ref={refTest}
        />
      </div>
    </div>
  );
};

export default Columns;
