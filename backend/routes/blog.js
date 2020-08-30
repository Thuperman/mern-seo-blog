const express = require('express'),
      router = express.Router(),
      { time } = require('../controllers/blog');

router.get('/', time);

module.exports = router;