import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import styles from "./Pie.module.scss";

const Pie = ({ data, cat }) => {
  const chartData = {
    series: data,
    options: {
      chart: {
        width: "100%",
        type: "pie",
        events: {
          click: (event, chartContext, config) => {
            console.log(event, chartContext, config);
          },
          dataPointSelection: (e, chart, options) => {
            console.log("hi", e, chart, options);
          },
        },
      },
      labels: cat,
      theme: {
        monochrome: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: 5,
          },
        },
      },
      title: {
        text: "Monochrome Pie",
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
      <div className={styles.title}>
        <h2>Pie Chart</h2>
        {console.log(data, cat)}
      </div>
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
