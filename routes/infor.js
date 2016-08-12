var express = require('express');
var router = express.Router();
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
router.get('/', function(req, res, next) {
	var url = 'http://www.dyhjw.com/gold/dyhj.html';
	if (req.query['curUrl'])
		url += req.query['curUrl'];
	// request(url, function(err1, res1, body) {
		request('http://120.55.243.84:8787/getNews?count=6', function(err2, res2, body2) {
			request('http://115.28.176.212/hq/LastData.php?qcodes=SHICOM_SZICOM_SZ399006', function(error3, response3, body3) {
				request('http://115.28.176.212/hq/LastData.php?qcodes=XAU_XAG_XPT', function(error4, response4, body4) {
					request('http://115.28.176.212/hq/LastData.php?qcodes=OILU_CONC_OILF', function(error5, response5, body5) {
						request('http://115.28.176.212/hq/LastData.php?qcodes=DINIW_USDCNY_EURUSD', function(error6, response6, body6) {
							request('http://114.215.194.241:81', function(error7, response7, body7) {
								// var html = iconv.decode(body, 'utf-8')
								// var $ = cheerio.load(html, {
								// 	decodeEntities: false
								// })
								// $('.newslist a').each(function(index, el) {
								// 	$(el).attr('target', '_blank');
								// });
								res.render('infor', {
									// ulList: $('.newslist').html(),
									newsList: JSON.parse(body2).data,
									guzhiData: JSON.parse(body3),
									guijinshuData: JSON.parse(body4),
									shangpingData: JSON.parse(body5),
									waihuiData: JSON.parse(body6),
									oldtoken:body7
								})
							})
						})
					})
				})

			})
		})
	})
// });
router.get('/:page/:catId', function(req, res, next) {
	var page = (req.params['page']-1) * 10;
	var catId=req.params['catId'];
	if(catId==0){
		sql='select * from article order by time desc limit ' + page + ',10';sql1='SELECT COUNT(*) AS pages  FROM article';
	}
	else if(catId==1){
		sql='select * from article where catId=1 order by time desc limit ' + page + ',10';sql1='SELECT COUNT(*) AS pages  FROM article where catId=1';
	}
	else{
		sql='select * from article where catId=2 order by time desc limit ' + page + ',10';sql1='SELECT COUNT(*) AS pages  FROM article where catId=2';
	}

	mysqlFun.query(sql, function(rows) {
		for (var i = 0; i < rows.length; i++) {
			rows[i]['time'] = moment(rows[i]['time']).format('YYYY-MM-DD HH:mm:ss');
			var html=rows[i]['content_html'];
			var index1=rows[i]['content_html'].indexOf("<p>");
			var index2=rows[i]['content_html'].indexOf("</p>");
			var indexHtml=rows[i]['content_html'].substring(index1+3,index2);
			if(indexHtml.indexOf('<img')==0)
			rows[i]["img"]=indexHtml;
		    else
		    rows[i]["img"]='<img src=%$%/images/cjzx.jpeg%$% width="170" height="111" alt="'+rows[i]['title']+'">';
		}
		mysqlFun.query(sql1, function(pageR) {
			res.json({
				articleList: rows,
				pages: parseInt(pageR[0].pages / 10)
			});
		})
	});
});


router.get('/getMore', function(req, res, next) {
	console.log(req.query['page']);
	if (req.query['page'])
		var url = "http://www.dyhjw.com/gold/dyhj-p-" + req.query['page'] + ".html";
	console.log(req.query['page'] + "asdf");
	request(url, function(err1, res1, body) {
		var html = iconv.decode(body, 'utf-8')
		var $ = cheerio.load(html, {
			decodeEntities: false
		})
		$('.newslist a').each(function(index, el) {
			$(el).attr('target', '_blank');
		});
		res.send($('.newslist').html());
	})

})


module.exports = router;