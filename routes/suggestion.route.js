const express = require('express');
const router = express.Router();
const verify_middleware = require('../verify_middleware/verify.token');
const controller = require('../controllers/suggestion.controllers');

router.post('/suggest', verify_middleware.verifyToken, controller.suggestItem);

router.get('/suggested', verify_middleware.verifyToken, controller.getSuggestions);

router.get('/suggested/:category', verify_middleware.verifyToken, controller.getSuggestions);


module.exports = router;                                                                                                                                                                    