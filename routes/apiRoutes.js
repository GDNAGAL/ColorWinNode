// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const auth = require('../middleware/apiAuth');

router.post('/User/login', apiController.login);
router.post('/User/Register', apiController.register);
router.post('/User/GameBetting',auth, apiController.GameBetting);
router.get('/CRONsJOB', apiController.CRON);
router.post('/GetGamePeriod', apiController.GetGamePeriod);
// Define other routes...

module.exports = router;
