import Consult from "./consult.js";
import Country from "./consultCountry.js";
import { menu } from "./menu.js";
import Graphic from "./graphic.js";
import Register from "./register.js";
import Nombres from "./fix_names.js";
import { datos, grafico } from "./api_chile.js";
import Logout from "./logout.js";

let contador = 0;
const arrayData = [];
const dividedArray = [];
const color = ["rgba(66, 134, 244, 0.2)", "rgba(255, 0, 0, 0.2)"];
let btn_grafico = document.getElementById("next-page");
let btn_grafico2 = document.getElementById("previous-page");

(async () => {
	const { data } = await Consult.getData();
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
	let { data } = await Consult.getData();

	if (data) {
		document.getElementById("graficototal").classList.remove("d-none");
		document.getElementById("loader").className = " d-none";
		document.getElementById("tabla").classList.remove("d-none");
	}

	let ctx = document.getElementById("myChart").getContext("2d");

	const myChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: dividedArray[contador].map((a) => a.location),
			datasets: [
				{
					label: "Casos confirmados",
					data: dividedArray[contador].map((a) => a.confirmed),
					backgroundColor: color[0],
					borderColor: "rgb(0, 60, 255)",
					borderWidth: 1,
				},
				{
					label: "Muertes",
					data: dividedArray[contador].map((a) => a.deaths),
					backgroundColor: color[1],
					borderColor: "rgb(255, 0, 0)",
					borderWidth: 1,
				},
			],
		},
		options: {
			legend: {
				labels: {
					fontColor: "#FFFFFF",
					fontSize: 12,
				},
			},
			scales: {
				xAxes: [
					{
						gridLines: {
							color: "rgba(66, 134, 244, 1)",
							lineWidth: 0.2,
						},
						ticks: {
							fontColor: "white",
							stepSize: 1,
							beginAtZero: true,
						},
					},
				],
				yAxes: [
					{
						gridLines: {
							color: "rgba(66, 134, 244, 1)",
							lineWidth: 0.2,
						},
						ticks: {
							fontColor: "white",
						},
					},
				],
			},
		},
	});

	//funciones que traen los siguientes datos al hacer click en los botones del grafico principal

	btn_grafico.addEventListener("click", (e) => {
		if (contador === -1) {
			contador = 0;
		}
		contador <= dividedArray, contador++;

		myChart.data.labels = dividedArray[contador].map((a) => a.location);
		myChart.data.datasets[0].data = dividedArray[contador].map(
			(a) => a.confirmed
		);

		myChart.data.datasets[1].data = dividedArray[contador].map((a) => a.deaths);
		myChart.update();

		if (contador != 0 && contador <= 18) {
			btn_grafico2.classList.remove("d-none");
		} else if (contador === 19) {
			btn_grafico.classList.add("d-none");
		}
	});

	btn_grafico2.addEventListener("click", (e) => {
		contador >= dividedArray, contador--;

		myChart.data.labels = dividedArray[contador].map((a) => a.location);
		myChart.data.datasets[0].data = dividedArray[contador].map(
			(a) => a.confirmed
		);
		myChart.data.datasets[1].data = dividedArray[contador].map((a) => a.deaths);
		myChart.update();
		if (contador <= 0) {
			btn_grafico2.classList.add("d-none");
		} else if (contador >= 1 && contador <= 18) {
			btn_grafico2.classList.remove("d-none");
			btn_grafico.classList.remove("d-none");
		}
	});
})();

//funcion que trae todos los datos y los inserta en la tabla

(async () => {
	let { data } = await Consult.getData();
	let table = document.getElementById("tableBody");

	Nombres(data).forEach((element) => {
		table.innerHTML += `<tr>
      <td>${element.location}</td>
      <td>${element.active}</td>
      <td>${element.confirmed}</td>
      <td>${element.recovered}</td>
      <td>${element.deaths}</td>
      <td><button type="button" data-country=${element.location} id="recorre" class="btn btn-outline-warning">Ver detalles</button></td>
      </tr>`;
	});

	$(document).ready(function () {
		$("#myTable").DataTable();
	});

	//funcion que llama al modal al hacer click en el detalle e inserta un grafico
	//los datos son insertados en arrays y se pasan como parametros a la funcion graphic

	const ChartData = async (e) => {
		$("#exampleModal").modal("show");

		let setCountry = e.target.dataset.country;
		const { data } = await Country.getCountry(setCountry);

		document.getElementById("myChart2").remove();
		var canvas = document.createElement("canvas");
		canvas.id = "myChart2";
		document.getElementById("bodyModal").appendChild(canvas);
		const ctx2 = document.getElementById("myChart2");

		let labelData = data.location;
		let label = ["Confirmados", "Muertes", "Recuperados", "Activos"];
		let colors = [
			"rgb(66, 134, 244, 0.2)",
			"rgb(74, 135, 72, 0.2)",
			"rgb(229, 89, 50, 0.2)",
			"rgb(125, 44, 35, 0.2)",
		];
		let borderColors = ["rgb(0, 60, 255)", "rgb(8, 202, 2)"];
		let borderWidth = [1.5, 1.5];
		let dataSet = [data.confirmed, data.deaths, data.recovered, data.active];

		Graphic(ctx2, labelData, label, colors, borderColors, borderWidth, dataSet);
	};

	const button = document.querySelectorAll("#recorre");
	button.forEach((boton) => {
		boton.addEventListener("click", ChartData);
	});
})();

//funcion que envia mail y password extraidos desde los inputs
//al hacer submit hace un llamado a la funcion register para obtener el jwt

document.getElementById("login").addEventListener("click", () => {
	$("#exampleModal2").modal("show");
	$("#form").submit(async (e) => {
		e.preventDefault();
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		const JWT = await Register(email, password);

		if (JWT) {
			menu();
			$("#exampleModal2").modal("hide");
			$("#login").hide();
			grafico(datos);
			Logout();
		}
	});
});

//funcion para persistir el token
//validacion que esconde elementos del navbar si existe el jwt

const init = async () => {
	const token = localStorage.getItem("jwt-token");
	if (token) {
		menu(token);
		$("#login").hide();
		Logout();
	}
};
init();
