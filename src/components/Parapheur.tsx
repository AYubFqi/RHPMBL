
import React from 'react'
import { Chart as ChartJS, Tooltip, Legend, ArcElement ,Title } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
export const data3 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Parapheur :React.FC= () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Title,
    Legend
  );
  
  ChartJS.register(ArcElement, Tooltip, Legend ,Title);

  const options = {
    responsive: true,
    title: {
      display: true,
      text: 'secteurs des dépenses salariales',
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      
    },
  };
  
  const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'];
  const data = {
    labels,
    datasets: [
      {
        label: '2022',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '2023',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  
 const options2 = {
    plugins: {
      title: {
        display: true,
        text: 'Répartition des dépenses salariales',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  
  
 const data2 = {
    labels,
    datasets: [
      {
        label: 'Mars',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Avril',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Mai',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };
  
  return (
    <div className="dash">
      <div
        key="myCharts"
        id="myCharts"
        className="chart1"
        style={{
          margin: "20px 0",
          backgroundColor: "white",
          fontSize: "20px",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
      {/* <Bar options={options} data={data} /> */}
      {/* <Doughnut data={data} /> */}
      {/* <Bar options={options2} data={data2} /> */}
      </div>
      </div>
      
  )
}

export default Parapheur