const { Router } = require('express');
const pollController = require('../controllers/pollController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/create-poll',requireAuth,pollController.create_poll_get);
router.post('/create-poll',requireAuth,pollController.create_poll_post);

module.exports = router;