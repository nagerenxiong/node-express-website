var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */

router.get('/', function(req, res, next) {
	var initCode = "CONC_OILU_XAU_XAG_AUTD_AGTD_DINIW_USDCNY_USDJPY_HSI";
	var codeStr = ["CONC", "OILU", "XAU", "XAG", "AUTD", "AGTD", "DINIW", "USDCNY", "USDJPY", "HSI"];
	request('http://115.28.176.212/hq/LastData.php?qcodes=' + initCode, function(error, response, body) {
		request('http://114.215.194.241:81', function(error1, response1, body1) {
			res.render('market', {
				type: 1,
				codeStr: codeStr,
				get_old_token: body1,
				initData: JSON.parse(body)
			});
		})

	})

});
router.get('/jinjiaosuo', function(req, res, next) {
	var initCode = "AUTD_AGTD_AU100G_AU9999_AU9995_AG9999_PT9995";
	var codeStr = ["AUTD", "AGTD", "AU100G", "AU9999", "AU9995", "AG9999", "PT9995"];
	request('http://115.28.176.212/hq/LastData.php?qcodes=' + initCode, function(error, response, body) {
		request('http://114.215.194.241:81', function(error1, response1, body1) {
			res.render('market', {
				type: 2,
				codeStr: codeStr,
				get_old_token: body1,
				initData: JSON.parse(body)
			});
		})

	})
});
router.get('/guojijin', function(req, res, next) {
	var initCode = "XAU_XAG_XPT_XPD_AUTW_AUHK";
	var codeStr = ["XAU", "XAG", "XPT", "XPD", "AUTW", "AUHK"];
	request('http://115.28.176.212/hq/LastData.php?qcodes=' + initCode, function(error, response, body) {
		request('http://114.215.194.241:81', function(error1, response1, body1) {
			res.render('market', {
				type: 3,
				codeStr: codeStr,
				get_old_token: body1,
				initData: JSON.parse(body)
			});
		})

	})

});
router.get('/wti-oil', function(req, res, next) {
	var initCode = "CONC_CONF_CONG_CONH_CONJ_CONK_CONM";
	var codeStr = ["CONC", "CONF", "CONG", "CONH", "CONJ","CONK_","CONM"];
	request('http://115.28.176.212/hq/LastData.php?qcodes=' + initCode, function(error, response, body) {
		request('http://114.215.194.241:81', function(error1, response1, body1) {
			res.render('market', {
				type: 5,
				codeStr: codeStr,
				get_old_token: body1,
				initData: JSON.parse(body)
			});
		})

	})

});
router.get('/bulunte-oil', function(req, res, next) {
	var initCode = "OILU_OILF_OILG_OILH_OILJ_OILK";
	var codeStr = ["OILU", "OILF", "OILG", "OILH", "OILJ","OILK"];
	request('http://115.28.176.212/hq/LastData.php?qcodes=' + initCode, function(error, response, body) {
		request('http://114.215.194.241:81', function(error1, response1, body1) {
			res.render('market', {
				type: 6,
				codeStr: codeStr,
				get_old_token: body1,
				initData: JSON.parse(body)
			});
		})

	})

});
router.get('/zhipan', function(req, res, next) {
	var initCode = "DINIW_USDCNY_EURUSD_GBPUSD_AUDUSD_USDJPY_USDSGD_USDHKD_USDCHF_USDCAD";
	var codeStr = ["DINIW", "USDCNY", "EURUSD", "GBPUSD", "AUDUSD","USDJPY","USDSGD","USDHKD","USDCHF","USDCAD"];
	request('http://115.28.176.212/hq/LastData.php?qcodes=' + initCode, function(error, response, body) {
		request('http://114.215.194.241:81', function(error1, response1, body1) {
			res.render('market', {
				type: 7,
				codeStr: codeStr,
				get_old_token: body1,
				initData: JSON.parse(body)
			});
		})

	})

});
router.get('/jiaochapan', function(req, res, next) {
	var initCode = "EURJPY_EURGBP_EURAUD_EURCHF_EURNZD_EURCAD_GBPJPY_GBPAUD_AUDJPY_NZDJPY";
	var codeStr = ["EURJPY", "EURGBP", "EURAUD", "EURCHF", "EURNZD","EURCAD","GBPJPY","GBPAUD","AUDJPY","NZDJPY"];
	request('http://115.28.176.212/hq/LastData.php?qcodes=' + initCode, function(error, response, body) {
		request('http://114.215.194.241:81', function(error1, response1, body1) {
			res.render('market', {
				type: 8,
				codeStr: codeStr,
				get_old_token: body1,
				initData: JSON.parse(body)
			});
		})

	})

});
router.get('/guzhi', function(req, res, next) {
	var initCode = "SHICOM_SZICOM_SZ399006_HSI_DJIA_NDXI_SPX";
	var codeStr = ["SHICOM", "SZICOM", "SZ399006", "HSI", "DJIA","NDXI","SPX"];
	request('http://115.28.176.212/hq/LastData.php?qcodes=' + initCode, function(error, response, body) {
		request('http://114.215.194.241:81', function(error1, response1, body1) {
			res.render('market', {
				type: 9,
				codeStr: codeStr,
				get_old_token: body1,
				initData: JSON.parse(body)
			});
		})

	})

});


module.exports = router;