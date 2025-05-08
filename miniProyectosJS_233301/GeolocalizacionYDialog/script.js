document.addEventListener('DOMContentLoaded', function () {

    const openButton = document.getElementById('openButton')
    const dialog = document.getElementById('main')
    const closeButton = document.getElementById('close')
    const parrafo = document.getElementById('text')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        alert('La geolocalización no es compatible con el navegador')
    }

    function showPosition(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        console.log(position)

        parrafo.textContent = `Esta es la ubicación del usuario: ${latitude}, ${longitude}`

        // Creamos un objeto de opciones para el mapa
        const mapOptions = {
            center: { lat: latitude, lng: longitude},
            zoom: 15
        }

        // Crear el mapa y lo asociamos con la etiqueta div donde se va a cargar
        const map = new google.maps.Map(document.getElementById('map'), mapOptions)

        // Añadir un marcador al mapa
        const marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: map,
            title: 'Mi ubicacion actual'
        })

        dialog.showModal()
    }

    openButton.onclick = () => {
        dialog.showModal()
    }

    closeButton.onclick = () => {
         dialog.classList.add('close-animate')
         setTimeout(() => {
            dialog.closest()
            dialog.classList.remove('close-animate')
         }, 300);
    }
})