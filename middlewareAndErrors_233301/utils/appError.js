const winston = require('winston')

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: 'error.log'})
    ]
})

class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') || `${statusCode}`.startsWith('4') ? 'error': 'fail'
        this.isOperation = true

        Error.captureStackTrace(this, this.constructor)
    }
}

// Función middleware para manejar errores
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    logger.error(err.message)

    // Enviar la respuesta json con el detalle del error
    res.status(err.statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        error: err
    })
}

module.exports = {
    AppError,
    globalErrorHandler
}