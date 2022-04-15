import Logout from './logout.js';

const confirmed = (async () => {
    const token = localStorage.getItem("jwt-token");
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
        const {
            data
        } = await response.json();

        console.log("getConfirmed", data);
    } catch (err) {
        // limpia el local store si el token no es valido
        localStorage.clear();
        console.error(`Error: ${err}`);
    }
})();

const deaths = (async () => {
    const token = localStorage.getItem("jwt-token");
    try {
        const response = await fetch(`http://localhost:3000/api/deaths`, {
            //tipo de request
            method: "GET",
            headers: {
                //tipo de autorizacion mas el token para validar
                Authorization: `Bearer ${token}`,
            },
        });
        //trae la data en formato json
        const {
            data
        } = await response.json();

        console.log("deaths", data);
    } catch (err) {
        // limpia el local store si el token no es valido
        localStorage.clear();
        console.error(`Error: ${err}`);
    }
})();

const recovered = (async () => {
    const token = localStorage.getItem("jwt-token");
    try {
        const response = await fetch(`http://localhost:3000/api/recovered`, {
            //tipo de request
            method: "GET",
            headers: {
                //tipo de autorizacion mas el token para validar
                Authorization: `Bearer ${token}`,
            },
        });
        //trae la data en formato json
        const {
            data
        } = await response.json();

        console.log("recovered", data);
    } catch (err) {
        // limpia el local store si el token no es valido
        localStorage.clear();
        console.error(`Error: ${err}`);
    }
})();



const graphic3 = (canvas, labelData, label, colors, dataSet) => {
    const graphicModal = new Chart(canvas, {
        type: "line",
        data: {
            labels: label,
            datasets: [{
                label: labelData,
                data: dataSet,
                backgroundColor: colors,
            }, ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                }, ],
            },
        },
    });
}