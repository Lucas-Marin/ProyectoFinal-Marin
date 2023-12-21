fetch("http://worldtimeapi.org/api/timezone/America/Argentina/Cordoba")
.then( (response)=> response.json())
.then( (data)=>{ 
    const hora = data.hora
    const horaLocal = document.getElementById("horario")
    laHora =>{
        const horaEnCordoba = document.createElement("p")
        horaEnCordoba.textContent = 'Hora en Cordoba: ${data.datetime}'
        horaLocal.appendChild(horaEnCordoba)
    }

})