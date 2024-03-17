$(document).ready(function () {
    const superheroe = $(`#formulario`)
    const numSuperHero = $(`#numSuperHero`)
    const resulhero = $(`#resulhero`)

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
                    conexiones: SuperHero.connections.group_affiliation,
                    publicado: SuperHero.biography.publisher,
                    ocupacion: SuperHero.work.occupation,
                    aparicion: SuperHero.biography.first_appearance,
                    altura: SuperHero.appearance.height,
                    peso: SuperHero.appearance.weight,
                    alianza: SuperHero.biography.aliases,
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


            },
            error(e) {
                console.log(e)
            }
        })

    }



})



