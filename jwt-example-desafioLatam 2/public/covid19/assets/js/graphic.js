//funcion creada para refactorizar el grafico (aun no esta completa) recibe los parametros y devuelve el grafico donde sea que lo llamen

const graphic = (
	canvas,
	labelData,
	label,
	colors,
	borderColors,
	borderWidth,
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
					borderColor: borderColors,
					borderWidth: borderWidth,
				},
			],
		},
		options: {
			legend: {
				labels: {
					fontColor: "#FFFFFF",
					fontSize: 14,
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
};

export default graphic;
