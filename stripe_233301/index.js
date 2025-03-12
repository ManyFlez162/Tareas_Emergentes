const express = require('express');
const cors = require('cors');
const app = express();
const { globalErrorHandler, AppError } = require('./utils/appError');
const morgan = require('morgan');
require('dotenv').config({ path: './variables.env' });
const paymentRouter = require('./routes/paymentRoute')
const db = require('./config/db');

db.conectar();

app.use(express.json());
app.use(morgan('combined'));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('api/payments/', paymentRouter)


app.all('*', (req, res, next) => {
  const error = new AppError(`No se pudo acceder a: ${req.originalUrl} en el servidor.`, 404);
  next(error);
})

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
