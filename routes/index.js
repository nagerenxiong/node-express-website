var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
	var cheerio = require('cheerio')
	var iconv = require('iconv-lite')
	var headers = {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
	}
	var curDate = new Date();
	var currentTime = curDate.toLocaleTimeString();
	var currentDate = curDate.toLocaleDateString();
	var currentWeek = curDate.getDay();
	var bodyHtml = bodyHtml1 = bodyHtml2 = bodyHtml3 = bodyHtml4 = bodyHtml5 = bodyHtml6 = "";
	switch (currentWeek) {
		case 1:
			currentWeek = '星期一'
			break;
		case 2:
			currentWeek = '星期二'
			break;
		case 3:
			currentWeek = '星期三'
			break;
		case 4:
			currentWeek = '星期四'
			break;
		case 5:
			currentWeek = '星期五'
			break;
		case 6:
			currentWeek = '星期六'
			break;
		case 7:
			currentWeek = '星期天'
			break;
	}
	request('http://120.55.243.84:8787/getNews?count=250', function(error, response, body) {
		bodyHtml = body;
		request('http://121.40.185.125:7878/proxy?date=' + currentDate, function(error1, response1, body1) {
			if (!error1 && response1.statusCode == 200) {
				bodyHtml1 = body1;
				request('http://115.28.176.212/hq/LastData.php?qcodes=AGTD_CONC_XAU_XAG_DINIW_AUTD', function(error2, response2, body2) {
					bodyHtml2 = body2;
					request('http://115.28.176.212/hq/LastData.php?qcodes=USDCNY_EURUSD_GBPUSD_AUDUSD_USDJPY_USDSGD', function(error3, response3, body3) {
						bodyHtml3 = body3;
						request('http://115.28.176.212/hq/LastData.php?qcodes=SHICOM_SZICOM_SZ399006_HSI_DJIA_NDXI', function(error4, response4, body4) {
							bodyHtml4 = body4;
							request('http://114.215.194.241:81', function(error5, response5, body5) {
								bodyHtml5 = body5;
								request({
									url: 'http://www.cnoil.com/analysis/cnoil/',
									encoding: null,
									headers: headers
								}, function(err6, res6, body6) {
									bodyHtml6 = body6;
								})

							})
						})
					})
				})
			}
			setTimeout(function() {
				var html = iconv.decode(bodyHtml6, 'gb2312')
				var $ = cheerio.load(html, {
					decodeEntities: false
				})
				$("img").each(function(index, el) {
					$(el).attr('src', 'http://www.cnoil.com/' + $(el).attr('src'));
				});
				$('.news_all_list li').each(function(index, el) {
					if (index > 5) {
						$(el).remove();
					}
				});
				res.render('index', {
					firstData: JSON.parse(bodyHtml),
					time: currentTime,
					date: currentDate,
					week: currentWeek,
					caijinData: JSON.parse(body1).EconomicCalendars,
					shangpingData: JSON.parse(bodyHtml2),
					waihuiData: JSON.parse(bodyHtml3),
					guzhiData: JSON.parse(bodyHtml4),
					tokenHQ: bodyHtml5,
					ulList: $('.news_all_list').html()
				});
			}, 3000);

		})
	})
});

router.use('/getMoreData', function(req, res, next) {
		console.log(req.body['LastKxid'])
		var moreUrl = 'http://120.55.243.84:8787/getMoreNews?LastKxid=' + req.body['LastKxid'] + '&count=100';
		request(moreUrl, function(error, response, body) {
			res.json(JSON.parse(body));
		})
	})
	// var iggg = 0;
	// var ggid = "";
	// // var dddd={"type": "2", "id": "AURTURNQIndex201608040930", "reality": "0.4%", "before": "0.5%", "predicttime": "2016-08-04 09:30:00", "state": "澳大利亚", "effect": "|金银 澳元 石油|", "time": "2016-08-04 09:30:06", "importance": "中", "forecast": "0.5%", "title": "第二季度零售销售季率", "autoid": "250672"}
	// router.use('/tempData', function(req, res, next) {
	// 	// var jsonstr={"type": "2", "id": "BRCPALLYIndex201608030701q123", "before": "-2.0%", "predicttime": "07:01", "state": "英国", "autoid": 250558, "time": "2016-08-03 07:01:00", "importance": "低", "forecast": "-2%", "reality": "-1.6%", "effect": "金银 英镑 石油||", "title": "7月BRC商店物价指数年率"}
	// 	// console.dir(jsonstr);
	// 	// iggg++;
	// 	request("http://120.55.243.84:8787/getNews?count=1", function(error, response, body) {
	// 		// if(iggg<5)		
	// 		if (JSON.parse(body).data[0].id != ggid && JSON.parse(body).data[0].type != "2") {
	// 			console.log(ggid + "   " + JSON.parse(body).data[0].id)
	// 			res.json(JSON.parse(body).data[0]);
	// 			console.log("ctm");			
	// 		} else {
	// 			res.send(JSON.parse(body).data[0].type+"  jsonId "+JSON.parse(body).data[0].id+" ggid "+ggid);
	// 		}
	// 		ggid = JSON.parse(body).data[0].id;
	// 		// else
	// 		// res.json(jsonstr);
	// 	})
	// })


var array1 = [];
// var dddd={"type": "2", "id": "AURTURNQIndex201608040930", "reality": "0.4%", "before": "0.5%", "predicttime": "2016-08-04 09:30:00", "state": "澳大利亚", "effect": "|金银 澳元 石油|", "time": "2016-08-04 09:30:06", "importance": "中", "forecast": "0.5%", "title": "第二季度零售销售季率", "autoid": "250672"}
router.use('/tempData', function(req, res, next) {
	request("http://120.55.243.84:8787/getMoreNews?count=6", function(error, response, body) {
		var array2 = JSON.parse(body).data;
		var result = [];
		for(var i = 0; i < array2.length; i++){
		    var obj = array2[i];
		    var num = obj.id;
		    var isExist = false;
		    for(var j = 0; j < array1.length; j++){
		        var aj = array1[j];
		        var n = aj.id;
		        if(n == num){
		            isExist = true;
		            break;
		        }
		    }
		    if(!isExist){
		        result.push(obj);
		    }
		}
		res.send(result);
		array1 = array2;
	})
})


module.exports = router;