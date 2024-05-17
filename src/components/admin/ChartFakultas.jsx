/* eslint-disable react/prop-types */
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartFakultas = ({ dataFakultas }) => {
  //   console.log({
  //     dataFakultas,
  //   });

  const labels = dataFakultas.map((item) =>
    item._id === "" ? "contoh fakultas" : item._id
  );

  const jumlah = dataFakultas.map((item) => item.total);

  function getRandomColor(count) {
    //generates random colours and puts them in string
    var colors = [];
    for (var i = 0; i < count; i++) {
      var letters = "0123456789ABCDEF".split("");
      var color = "#";
      for (var x = 0; x < 6; x++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }
    return colors;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Jumlah Laporan per Fakultas",
        data: jumlah,
        backgroundColor: getRandomColor(jumlah.length),
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    // tension: 0.4,
    // pointRadius: 0,
    // borderWidth: 3,
    // fill: true,
    // maxBarThickness: 6,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Laporan Tiap Fakultas",
        font: {
          size: 25,
        },
      },
    },
  };
  return (
    <Pie
      data={data}
      style={{
        maxHeight: "20rem",
        marginTop: "5rem",
        maxWidth: "20rem",
      }}
      options={options}
    />
  );
};

export default ChartFakultas;
