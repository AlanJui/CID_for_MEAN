const router = require('express').Router();
const controller = require('./job.controller');

router.get('/', controller.index);
router.get('/:id', controller.retrieve);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

module.exports = router;
