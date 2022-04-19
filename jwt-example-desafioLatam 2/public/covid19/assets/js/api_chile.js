import { menuChile } from "./menu.js";
import Logout from "./logout.js";

const situacionChile = async () => {
	const token = localStorage.getItem("jwt-token");
	if (token) {
		menuChile(token);
	}
	Logout();
};

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
				//tipo de autorizacion mas el token para validar
				Authorization: `Bearer ${token}`,
			},
		});
		//trae la data en formato json
		const { data } = await response.json();

		data.forEach((element) => {
			confirmed.push(element);
		});

		const response1 = await fetch(`http://localhost:3000/api/recovered`, {
			//tipo de request
			method: "GET",
			headers: {
				//tipo de autorizacion mas el token para validar
				Authorization: `Bearer ${token}`,
			},
		});
		//trae la data en formato json
		const { data: data1 } = await response1.json();

		data1.forEach((element) => {
			recover.push(element);
		});

		const response2 = await fetch(`http://localhost:3000/api/deaths`, {
			//tipo de request
			method: "GET",
			headers: {
				//tipo de autorizacion mas el token para validar
				Authorization: `Bearer ${token}`,
			},
		});
		//trae la data en formato json
		const { data: data2 } = await response2.json();

		data2.forEach((element) => {
			deaths.push(element);
		});

		grafico(confirmed, recover, deaths);

		if (data && data1 && data2) {
			let elemento = document.getElementById("loader");
			elemento.className += "d-none";

			document.getElementById("fondo").className += "bg-dark";
		}
	} catch (err) {
		// limpia el local store si el token no es valido
		/* localStorage.removeItem("jwt-token")
		console.error(`Error: ${err}`);*/
	}
};

const grafico = (confirmed, recover, deaths) => {
	let myChart;
	const dato = {
		labels: confirmed.slice(4, 800).map((item) => item.date),
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
		data: dato,
	};

	if (myChart instanceof Chart) {
		myChart.destroy();
	}

	myChart = new Chart(document.getElementById("myChartChile"), config);
};

datos();
situacionChile();
