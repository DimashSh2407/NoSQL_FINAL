const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { authenticate, authorize } = require('../middleware/auth');

// Статистика доступна только для инструкторов
router.get('/', authenticate, authorize('instructor'), statsController.getStats);

module.exports = router;

