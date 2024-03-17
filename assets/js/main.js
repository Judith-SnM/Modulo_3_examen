let superheroe = document.querySelector(`#formulario`)
const numSuperHero = document.querySelector(`#numSuperHero`)
const errorSuperHero = document.querySelector(`.errorSuperHero`)
const regex1 = /[0-9]/gim

formulario.addEventListener("submit", (event) => {
    event.preventDefault()
    if (numSuperHero.value.trim() === "") {
        errorSuperHero.textContent = ("El Numero es requerido");
    } else {
        if (regex1.test(numSuperHero.value)) {
        } else {
            errorSuperHero.textContent = ("error con la informacion entregada, solo Numeros");
        }
    }

})