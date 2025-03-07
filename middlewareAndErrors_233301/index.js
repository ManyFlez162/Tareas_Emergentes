const express = require('express')
const app = express()
const {globalErrorHandler, AppError} = require('./utils/appError')
const userRoutes = require('./routes/userRoute')
const morgan = require('morgan')
require('dotenv').config({path: './config.env'})

// Middleware para analizar datos en formato JSON en el cuerpo de la solicitud
app.use(express.json())

// Configurear el middleware de morgan para el registro de solicitudes
app.use(morgan('combined'))

// Middleware para exponer mis rutas y que puedan ser accedidas
app.use('/api/users', userRoutes)

app.all('*', (req, resp, next) => {
    const error = new AppError(`No se ha podido acceder a ${req.originalUrl} en el servidor :(`, 404)
    next(error)
})

// Middleware para el manejo de errores
app.use(globalErrorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('El servidor está corriendo en el puerto', PORT)
})
