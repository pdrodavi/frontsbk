var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  
    const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
    
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}

});

module.exports = router;