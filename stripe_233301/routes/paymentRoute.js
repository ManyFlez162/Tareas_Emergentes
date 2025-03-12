const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')

router.get('/:id', paymentController.showPaymentForm)
router.post('/', paymentController.createPayment)
router.patch('/:id', paymentController.processPayment)

module.exports = router