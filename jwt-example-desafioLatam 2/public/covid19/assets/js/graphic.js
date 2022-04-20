//funcion creada para refactorizar el grafico (aun no esta completa) recibe los parametros y devuelve el grafico donde sea que lo llamen

const graphic = (
	canvas,
	labelData,
	label,
	colors,
	borderColor,
	border,
	dataSet
) => {
	const graphicModal = new Chart(canvas, {
		type: "bar",
		data: {
			labels: label,
			datasets: [
				{
					label: labelData,
					data: dataSet,
					backgroundColor: colors,
					borderColor: borderColor,
					borderWidth: border,
				},
			],
		},

		options: {
			/* title: {
				text: labelData,
				fontColor: "#FFFFFF",
				fontSize: 16,
				display: true,
			}, */
			legend: {
				labels: {
					fontColor: "#FFFFFF",
					fontSize: 16,
				},
			},
			scales: {
				xAxes: [
					{
						ticks: {
							beginAtZero: true,
							display: true,
						},
						gridLines: {
							color: "rgb(32, 83, 214,0.2)", //give the needful color
							display: true,
						},
					},
				],
				yAxes: [
					{
						gridLines: {
							color: "rgb(32, 83, 214, 0.2)", //give the needful color
						},
						display: true,
					},
				],
			},
		},
	});
};

export default graphic;
