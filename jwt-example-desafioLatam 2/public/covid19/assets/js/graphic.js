//funcion creada para refactorizar el grafico (aun no esta completa) recibe los parametros y devuelve el grafico donde sea que lo llamen

const graphic = (canvas, labelData, label, colors, dataSet) => {
  const graphicModal = new Chart(canvas, {
    type: "bar",
    data: {
      labels: label,
      datasets: [
        {
          label: labelData,
          data: dataSet,
          backgroundColor: colors,
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

export default graphic;
