const express = require('express')
const router = express.Router();
const btc = require('../controllers/bitcoin')
const { isAuthenticated } = require('../passportConfig');

router.get('/price', isAuthenticated, btc.price);
router.get('/details', isAuthenticated, btc.getDetails)

module.exports = router;