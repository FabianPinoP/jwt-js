import Consult from "./consult.js";
import Country from "./consultCountry.js";

(async () => {
  const { data } = await Consult.getData();
  const filterData = data.filter((a) => a.confirmed >= 10000000);
  const confirmed = [];
  const location = [];
  filterData.forEach((element) => {
    confirmed.push(element.confirmed);
    location.push(element.location);
  });

  let ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: location,
      datasets: [
        {
          label: "Casos confirmados",
          data: confirmed,
          backgroundColor: [
            "rgb(66, 134, 244)",
            "rgb(74, 135, 72)",
            "rgb(229, 89, 50)",
            "rgb(125, 44, 35)",
            "rgb(90, 35, 125)",
            "rgb(18, 204, 182)",
            "rgb(214, 211, 17)",
            "rgb(138, 11, 212)",
            "rgb(50, 66, 168)",
            "rgb(50, 168, 82)",
          ],
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
})();
(async () => {
  let { data } = await Consult.getData();
  let table = document.getElementById("tableBody");

  data.forEach((element) => {
    table.innerHTML += `<tr>
      <td>${element.location}</td>
      <td>${element.active}</td>
      <td>${element.confirmed}</td>
      <td>${element.recovered}</td>
      <td>${element.deaths}</td>
      <td><button type="button" data-country=${element.location} class="btn btn-success">${element.location}</button></td>
      </tr>`;
  });

  $(document).ready(function () {
    $("#myTable").DataTable();
  });

  const ChartData = async (e) => {
    $("#exampleModal").modal("show");
    let setCountry = e.target.dataset.country;
    const { data } = await Country.getCountry(setCountry);

    document.getElementById("myChart2").remove();
    var canvas = document.createElement("canvas");
    canvas.id = "myChart2";
    document.getElementById("bodyModal").appendChild(canvas);
    const ctx2 = document.getElementById("myChart2");

    const graphicModal = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: ["Confirmados", "Muertes", "Recuperados", "Activos"],
        datasets: [
          {
            label: `${data.location}`,
            data: [data.confirmed, data.deaths, data.recovered, data.active],
            backgroundColor: [
              "rgb(66, 134, 244)",
              "rgb(74, 135, 72)",
              "rgb(229, 89, 50)",
              "rgb(125, 44, 35)",
            ],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };

  const button = document.querySelectorAll(".btn-success");
  button.forEach((boton) => {
    boton.addEventListener("click", ChartData);
  });
})();
