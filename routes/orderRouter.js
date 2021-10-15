const router = require('express').Router()
const orderCtrl = require('../controllers/ordersCtrl')
const auth = require('../middleware/auth')


router.route('/payment')
    .get(auth, orderCtrl.getPayments)
    .post(auth, orderCtrl.createPayment)


module.exports = router
