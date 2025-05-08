// Obtener la etiqueta de video
const video = document.getElementById('video')

// Obtener el canvas
const canvas = document.getElementById('overlay')

// Acceder al contexto 2D del canvas. Esto nos permitirá dibujar los cuadros sobre los rostros detectados
const context = canvas.getContext('2d')

// Cargar el modelo de detección de rostros "Tiny Face Detector" desde la carpeta models
// face-api.js para detectar/identificar rostros en el video
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/FaceApi/models')
]).then(startVideo)

// Función que solicita el acceso a la cámara 
function startVideo() {
    // Pedimos el acceso a la cámara con el getUserMedia (Solo video, no audio)
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
            video.srcObject = stream
        }).catch((err) => {
            console.log('Error al acceder a la cámara del usuario: ', err.message)
        })
}

// Cuando el video ya esté listo o ya se esté reproduciendo 
video.addEventListener('play', () => {
    // Creamos un objeto con el ancho y alto del video
    // Esto servirá para que el canvas tenga las mismas dimensiones del video
    const displaySize = { width: video.width, height: video.height }

    faceapi.matchDimensions(canvas, displaySize)

    // Creamos un bucle que se ejecutará cada 100 milisegundos
    setInterval(async () => {
        // Detectamos todos los rostros en la imagen actual del video
        const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
        )

        // Redimensionamos los resultados de la detección
        const resizedDetections = faceapi.resizeResult(detections, displaySize)
        
        context.clearRect(0, 0, canvas.width, canvas.height)

        faceapi.draw.drawDetections(canvas, resizedDetections)

    }, 100)
})
