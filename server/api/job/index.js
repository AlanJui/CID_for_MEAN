const router = require('express').Router();
const controller = require('./job.controller');

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
