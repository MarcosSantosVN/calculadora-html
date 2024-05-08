const cuenta = document.querySelector("#cuenta");
const botones = document.querySelectorAll(".btn");

const hitorial = document.querySelector("#resultHisto");

if (localStorage.getItem("cuentaHisto") == null) {
    localStorage.setItem("cuentaHisto", JSON.stringify([]));
}
mostrarHistorial();

botones.forEach(element => {
    element.addEventListener("click", () => {

        const pulsado = element.textContent;

        if (element.id == "igual") {

            const historyElements = JSON.parse(localStorage.getItem("cuentaHisto"));
            if (!historyElements.includes(cuenta.value)) {
                historyElements.push(cuenta.value);
            }
            localStorage.setItem("cuentaHisto", JSON.stringify(historyElements));

            mostrarHistorial();

            try {
                cuenta.value = eval(cuenta.value);

            } catch {
                cuenta.value = "Error";
            }

        } else if (element.id == "clean") {
            cuenta.value = "";

        } else if (element.id == "borrar") {
            if (cuenta.value.length == 1 || cuenta.value == "Error") {
                cuenta.value = "";
            } else {
                cuenta.value = cuenta.value.slice(0, -1);
            }

        } else if (cuenta.value == "Error") {
            cuenta.value = pulsado;
        } else {
            cuenta.value += pulsado;
        }

    })
});


function mostrarHistorial() {
    let histo = JSON.parse(localStorage.getItem("cuentaHisto"));

    hitorial.innerHTML = "";

    for (let i = histo.length - 1; i >= 0; i--) {
        const div = document.createElement('div');
        div.className = "elementoHisto";

        let resultado = "";

        try {
            resultado = eval(histo[i]);

        } catch {
            resultado = "Error";
        }

        if (resultado == "Error") {
            div.innerHTML = `<div class="bg-warning">${histo[i]} = ${resultado}</div>`;
        } else {
            div.innerHTML = `<div>${histo[i]} = ${resultado}</div>`;
        }

        hitorial.appendChild(div);
    }

}

document.getElementById("borrarHisto").onclick = borrarHistorial;

function borrarHistorial() {
    localStorage.clear();
    document.getElementById("resultHisto").innerHTML = null;
    if (localStorage.getItem("cuentaHisto") == null) {
        localStorage.setItem("cuentaHisto", JSON.stringify([]));
    }
}