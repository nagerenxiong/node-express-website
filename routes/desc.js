var express = require('express');
var router = express.Router();
var request = require('request');
var mysqlFun = require('../model/mysqlBaseFun');
var moment = require("moment");
var headers = {
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
var originRequest = require('request')
var cheerio = require('cheerio')
var iconv = require('iconv-lite');

function request(url, callback) {
	var options = {
		url: url,
		encoding: null,
		headers: headers
	}
	originRequest(options, callback)
}

router.get('/:id', function(req, res, next) {
	var id = req.params['id'];
	mysqlFun.query("select * from article where id=" + id, function(rows) {
		for (var i = 0; i < rows.length; i++) {
			rows[i]['time'] = moment(rows[i]['time']).format('YYYY年MM月DD日 HH:mm');
			rows[i]['content_html'] = rows[i]['content_html'].replace(/\%\$\%/g, "\"");
		}
		request('http://120.55.243.84:8787/getNews?count=6', function(err2, res2, body2) {
			request('http://115.28.176.212/hq/LastData.php?qcodes=SHICOM_SZICOM_SZ399006', function(error3, response3, body3) {
				request('http://115.28.176.212/hq/LastData.php?qcodes=XAU_XAG_XPT', function(error4, response4, body4) {
					request('http://115.28.176.212/hq/LastData.php?qcodes=OILU_CONC_OILF', function(error5, response5, body5) {
						request('http://115.28.176.212/hq/LastData.php?qcodes=DINIW_USDCNY_EURUSD', function(error6, response6, body6) {
							request('http://114.215.194.241:81', function(error7, response7, body7) {
								res.render('desc', {
									article: rows,
									newsList: JSON.parse(body2).data,
									guzhiData: JSON.parse(body3),
									guijinshuData: JSON.parse(body4),
									shangpingData: JSON.parse(body5),
									waihuiData: JSON.parse(body6),
									oldtoken:body7
								});
							})
						})
					})
				})
			})
		})
	});
});

module.exports = router;