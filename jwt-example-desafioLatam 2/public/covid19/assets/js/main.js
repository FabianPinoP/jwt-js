import Consult from "./consult.js";
import Country from "./consultCountry.js";
import Graphic from "./graphic.js";
import Register from "./register.js";
import logout from "./logout.js"

let contador = 0;
const arrayData = [];
const dividedArray = [];
const color = ["rgb(66, 134, 244)", "rgb(255, 0, 0)"];
let grafico = document.getElementById("next-page");
let grafico2 = document.getElementById("previous-page");
(async () => {
  const {
    data
  } = await Consult.getData();
  const filterData = data.filter((a) => a.confirmed >= 100);

  filterData.forEach((element) => {
    arrayData.push(element);
  });
  for (let i = 0; i < arrayData.length; i += 10)
    (() => {
      const newArray = arrayData.slice(i, i + 10);
      dividedArray.push(newArray);
    })();
})();

(async () => {
  let {
    data
  } = await Consult.getData();

  let ctx = document.getElementById("myChart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dividedArray[contador].map((a) => a.location),
      datasets: [{
          label: "Casos confirmados",
          data: dividedArray[contador].map((a) => a.confirmed),

          backgroundColor: color[0],
        },
        {
          label: "Muertes",
          data: dividedArray[contador].map((a) => a.deaths),
          backgroundColor: color[1],
        },
      ],
    },
    options: {
      scales: {
        yAxes: [{
          beginAtZero: true,
        }, ],
      },
    },
  });

  grafico.addEventListener("click", (e) => {
    contador <= dividedArray, contador++;

    myChart.data.labels = dividedArray[contador].map((a) => a.location);
    myChart.data.datasets[0].data = dividedArray[contador].map(
      (a) => a.confirmed
    );
    myChart.data.datasets[1].data = dividedArray[contador].map((a) => a.deaths);
    myChart.update();
  });
  grafico2.addEventListener("click", (e) => {
    contador >= dividedArray, contador--;

    myChart.data.labels = dividedArray[contador].map((a) => a.location);
    myChart.data.datasets[0].data = dividedArray[contador].map(
      (a) => a.confirmed
    );
    myChart.data.datasets[1].data = dividedArray[contador].map((a) => a.deaths);
    myChart.update();
  });
})();

(async () => {
  let {
    data
  } = await Consult.getData();
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
    const {
      data
    } = await Country.getCountry(setCountry);

    document.getElementById("myChart2").remove();
    var canvas = document.createElement("canvas");
    canvas.id = "myChart2";
    document.getElementById("bodyModal").appendChild(canvas);
    const ctx2 = document.getElementById("myChart2");

    let labelData = data.location;
    let label = ["Confirmados", "Muertes", "Recuperados", "Activos"];
    let colors = [
      "rgb(66, 134, 244)",
      "rgb(74, 135, 72)",
      "rgb(229, 89, 50)",
      "rgb(125, 44, 35)",
    ];
    let dataSet = [data.confirmed, data.deaths, data.recovered, data.active];

    Graphic(ctx2, labelData, label, colors, dataSet);
  };

  const button = document.querySelectorAll(".btn-success");
  button.forEach((boton) => {
    boton.addEventListener("click", ChartData);
  });
})();

document.getElementById("login").addEventListener("click", () => {
  $("#exampleModal2").modal("show");
  $("#form").submit(async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const JWT = await Register(email, password);


    if (JWT) {
      document.getElementById("situacion").innerHTML = '<a class="nav-link" type="button" href="./chile.html" >Situacion Chile</a>';
      document.getElementById("cerrarSesion").innerHTML = '<a id="salir" class="nav-link" type="button" href="" >Cerrar Sesion</a>';
      $("#exampleModal2").modal("hide");
      $("#login").hide();

      logout();
    }
  });
});