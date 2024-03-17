$(document).ready(function () {
    const superheroe = $(`#formulario`)
    const numSuperHero = $(`#numSuperHero`)
    const resulhero = $(`#resulhero`)
    const chartContainer = $(`#chartContainer`)

    superheroe.on("submit", function (event) {
        event.preventDefault()
        numSuperHero.removeClass("is-valid is-invalid")

        const usernumSuperHero = +numSuperHero.val()
        if (usernumSuperHero > 0) {
            if (usernumSuperHero < 731) {
                numSuperHero.addClass("is-valid")
                getSuperHero(usernumSuperHero)
            } else {
                numSuperHero.addClass("is-invalid")
            }

        } else {
            numSuperHero.addClass("is-invalid")
        }

    })

    const getSuperHero = (numSuperHerofn) => {
        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${numSuperHerofn}`,
            method: "GET",
            success(SuperHero) {
                const mySuperHero = {
                    Imagen: SuperHero.image.url,
                    nombre: SuperHero.name,
                    conexiones: SuperHero.connections["group-affiliation"],
                    publicado: SuperHero.biography.publisher,
                    ocupacion: SuperHero.work.occupation,
                    aparicion: SuperHero.biography["first-appearance"],
                    altura: SuperHero.appearance.height,
                    peso: SuperHero.appearance.weight,
                    alianza: SuperHero.biography.aliases,
                    estadistica: SuperHero.powerstats,
                }

                resulhero.html(`
                
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${mySuperHero.Imagen}" class="img-fluid rounded-start" alt="SuperHero">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Nombre: ${mySuperHero.nombre}</h5>
                                <p class="card-text">Conexiones: ${mySuperHero.conexiones}</p>
                                <div class="card-text" style="width: 18rem;">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Publicado por: ${mySuperHero.publicado} </li>
                                        <li class="list-group-item">Ocupación: ${mySuperHero.ocupacion}</li>
                                        <li class="list-group-item">Primera Aparición: ${mySuperHero.aparicion}</li>
                                        <li class="list-group-item">Altura: ${mySuperHero.altura} </li>
                                        <li class="list-group-item">Peso: ${mySuperHero.peso}</li>
                                        <li class="list-group-item">Alianzas: ${mySuperHero.alianza} </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `)

                const dataPoints = [];
                for (const [key, value] of Object.entries(mySuperHero.estadistica)) {
                    dataPoints.push({ label: key, y: parseInt(value) });
                }

                const options = {
                    title: {
                        text: `Estadisticas de Poder para ${mySuperHero.nombre}`
                    },
                    theme: "light2",
                    animationEnabled: true,
                    data: [
                        {
                            type: "pie",
                            startAngle: 40,
                            toolTipContent: "<b>{label}</b>: ({y})",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - ({y})",
                            dataPoints: dataPoints,
                        }
                    ]
                }
                chartContainer.CanvasJSChart(options);
            },
            error(e) {
                console.log(e)
            }
        })
    }
})



