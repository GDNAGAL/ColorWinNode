// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const auth = require('../middleware/apiAuth');

router.post('/User/login', apiController.login);
router.post('/User/Register', apiController.register);
router.get('/users', auth, apiController.getUsers);
router.post('/users', auth, apiController.createUser);
// Define other routes...

module.exports = router;
