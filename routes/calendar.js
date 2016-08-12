var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
	var curDate = new Date();
	var currentDate = curDate.toLocaleDateString();
	request('http://121.40.185.125:7878/proxy?date='+currentDate, function(error, response, body) {
		res.render('calendar', {
		currentDate: currentDate,
		data:JSON.parse(body).EconomicCalendars,
		ImportThings:JSON.parse(body).ImportThings,
		HolidayNotices:JSON.parse(body).HolidayNotices
		});
	})
});
router.get('/update', function(req, res, next) {
	console.log(req.baseUrl);
	var curDate=req.param("date");
	console.log(curDate+"22");
	debugger;
	request('http://121.40.185.125:7878/proxy?date='+curDate, function(error, response, body) {
		res.json(JSON.parse(body));
	})
})
module.exports = router;