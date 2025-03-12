const paymentDAO = require('../dataAccess/paymentDAO')

const createPayment = async (req, res) => {
    const { amount, currency } = req.body
    const payment = await paymentDAO.createPayment(amount, currency)
    res.json({ paymentLink: `http://localhost:3000/api/payments/${payment.id}` })
}

const showPaymentForm = async (req, res) => {
    const payment = await paymentDAO.getPaymentById(req.params.id)
    if (!payment) return res.status(404).json({ message: 'Pago no encontrado' });
    res.sendFile(path.join(__dirname, '../public/payment.html'))
}

const processPayment = async (req, res) => {
    const payment = await paymentDAO.updatePaymentStatus(req.params.id, 'completed')
    res.json({ message: 'Pago procesado' })
}

module.exports = { createPayment, showPaymentForm, processPayment }