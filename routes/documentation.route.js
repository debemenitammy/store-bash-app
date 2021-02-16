const express = require('express');
const router = express.Router();

const controller = require("../controllers/documentation.controller");

router.get('/', controller.documentation);
module.exports = router;