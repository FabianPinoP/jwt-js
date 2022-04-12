/* Recibe labeldata = data.location, label = ["Confirmados", "Muertes", "Recuperados", "Activos"], colors =  backgroundColor: [
  "rgb(66, 134, 244)","rgb(74, 135, 72)", "rgb(229, 89, 50)", "rgb(125, 44, 35)",] , dataSet =  data: [data.confirmed, data.deaths, data.recovered, data.active] */

  
const graphic = (canvas, labelData, label, colors, dataSet) => {
    const graphicModal = new Chart(canvas, {
        type: "bar",
        data: {
          labels: label,
          datasets: [
            {
              label: labelData,
              data: dataSet,
              backgroundColor:colors,
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
}

export default graphic;