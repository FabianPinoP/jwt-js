import { menuChile } from "./menu.js";
import Logout from "./logout.js";

const situacionChile = async () => {
	const token = localStorage.getItem("jwt-token");
	if (token) {
		menuChile(token);
	}
	Logout();
};

//funcion que realiza 3 llamados a apis distintas de tipo get
//itera sus respuestas y las deja en un arrays vacios para luego pasarlos al grafico

const datos = async () => {
	const token = localStorage.getItem("jwt-token");
	var confirmed = [];
	var recover = [];
	var deaths = [];

	try {
		const response = await fetch(`http://localhost:3000/api/confirmed`, {
			//tipo de request
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const { data } = await response.json();

		data.forEach((element) => {
			confirmed.push(element);
		});

		const response1 = await fetch(`http://localhost:3000/api/recovered`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const { data: data1 } = await response1.json();

		data1.forEach((element) => {
			recover.push(element);
		});

		const response2 = await fetch(`http://localhost:3000/api/deaths`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const { data: data2 } = await response2.json();

		data2.forEach((element) => {
			deaths.push(element);
		});

		grafico(confirmed, recover, deaths);

		//condicional que esconde la animacion loader cuando se completa la carga de los datos

		if (data && data1 && data2) {
			let elemento = document.getElementById("loader");
			elemento.className += "d-none";

			document.getElementById("fondo").className += "bg-dark";
		}
	} catch (err) {}
};

//funcion que devuelve un grafico con los datos extraidos de la funcion anterior

const grafico = (confirmed, recover, deaths) => {
	let myChart;
	const data = {
		labels: confirmed.slice(4, 800).map((item) => item.date),
		axis: "y",
		datasets: [
			{
				label: "Confirmados",
				backgroundColor: "rgb(255, 205, 86)",
				data: confirmed.slice(4, 800).map((item) => item.total),
				fill: false,
				tension: 0.1,
			},
			{
				label: "Recuperados",
				backgroundColor: "rgb(75, 192, 192)",
				data: recover.slice(4, 800).map((item) => item.total),
				fill: false,
				tension: 0.1,
			},
			{
				label: "Muertes",
				backgroundColor: "rgb(201, 203, 207)",
				data: deaths.slice(4, 800).map((item) => item.total),
				fill: false,
				tension: 0.1,
			},
		],
	};

	const config = {
		type: "line",
		data,
		options: {
			tension: 0.1,

			scales: {
				x: {
					grid: {
						color: "rgb(32, 83, 214,0.2)",
						display: true,
					},
					ticks: {
						color: "#FFFFFF",
					},
				},
				y: {
					grid: {
						color: "rgb(32, 83, 214,0.2)",
						display: true,
					},
					ticks: {
						fontSize: 14,
						color: "#FFFFFF",
					},
				},
			},
		},
	};

	if (myChart instanceof Chart) {
		myChart.destroy();
	}

	myChart = new Chart(document.getElementById("myChartChile"), config);
};
datos();
situacionChile();
