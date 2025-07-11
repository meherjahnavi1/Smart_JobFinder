// components/ProgressBarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./index.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProgressBarChart = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const colors = [
    "#FF6384", // education
    "#36A2EB", // experience
    "#FFCE56", // personalDetails
    "#4BC0C0", // projects
    "#9966FF", // skills
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Completion %",
        data: values,
        backgroundColor: colors,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: "x", // horizontal bars
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <>
  <p className="cvb-progress-title">Your Resume Progress</p>
  <Bar data={chartData} options={options} /></>
};

export default ProgressBarChart;
