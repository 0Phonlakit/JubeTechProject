const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/auth');


 router.post('/payment/charge', verifyToken, paymentController.createCharge);


router.post('/payment/checkout', verifyToken, paymentController.createCheckoutSession);

router.get('/payment/status/:chargeId', verifyToken, paymentController.checkPaymentStatus);


router.get('/history/:userId', verifyToken, paymentController.getPaymentHistory);

router.post('/payment/webhook', paymentController.webhook);

module.exports = router;
