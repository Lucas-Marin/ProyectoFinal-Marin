const CLAVE_LOCALSTORAGE = "lista_tareas"
let url = "http://worldtimeapi.org/api/timezone/America/Argentina/Cordoba"
fetch(url)
.then((resp) => resp.json())
.then((data) =>[
	console.table(data)
])
.catch((error)=> {
	console.error("algo andubo mal")
})


document.addEventListener("DOMContentLoaded", () => {
	let tareas = []
	const $contenedorTareas = document.querySelector("#contenedorTareas"),
		$btnGuardarTarea = document.querySelector("#btnAgregarTarea"),
		$inputNuevaTarea = document.querySelector("#inputNuevaTarea")

	$btnGuardarTarea.onclick = () => {
		const tarea = $inputNuevaTarea.value;
		if (!tarea) {
			return
		}
		tareas.push({
			tarea: tarea,
			terminada: false,
		})
		$inputNuevaTarea.value = ""
		guardarTareasEnAlmacenamiento()
		refrescarListaDeTareas()
	}

	const obtenerTareasDeAlmacenamiento = () => {
		const posibleLista = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE))
		if (posibleLista) {
			return posibleLista
		} else {
			return []
		}
	}
	const guardarTareasEnAlmacenamiento = () => {
		localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas))
	}
	const refrescarListaDeTareas = () => {
		$contenedorTareas.innerHTML = ""
		for (const [indice, tarea] of tareas.entries()) {
			const $enlaceParaEliminar = document.createElement("a")
			$enlaceParaEliminar.classList.add("enlace-eliminar")
			$enlaceParaEliminar.innerHTML = "&times;"
			$enlaceParaEliminar.href = ""
			$enlaceParaEliminar.onclick = (evento) => {
				evento.preventDefault(Swal.fire({
					text: "Tarea eliminada con exito",
					icon: "success"
				  }))			  
				tareas.splice(indice, 1)
				const eventoFuturo = (tareas) => {
					return new Promise( (resolve, reject) => {
						if (tareas === true) {
							resolve('Promesa resuelta')
						} else {
							reject('Promesa rechazada')
						}
					})
				}
				console.log( eventoFuturo(true) )
				console.log( eventoFuturo(false) )
				guardarTareasEnAlmacenamiento(tareas)
				refrescarListaDeTareas()
			}
			const $checkbox = document.createElement("input")
			$checkbox.type = "checkbox"
			$checkbox.onchange = function () { 
				if (this.checked) {
					tareas[indice].terminada = true
				} else {
					tareas[indice].terminada = false
				}
				guardarTareasEnAlmacenamiento(tareas)
				refrescarListaDeTareas()
			}
			const $span = document.createElement("span")
			$span.textContent = tarea.tarea
			const $li = document.createElement("li")
			if (tarea.terminada) {
				$checkbox.checked = true
				$span.classList.add("tachado")
			}
			$li.appendChild($checkbox)
			$li.appendChild($span)
			$li.appendChild($enlaceParaEliminar)
			$contenedorTareas.appendChild($li)
		}
	}
	tareas = obtenerTareasDeAlmacenamiento()
	refrescarListaDeTareas()
})