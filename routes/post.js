var express = require('express');
var router = express.Router();
var request = require('request');
var mysqlFun=require('../model/mysqlBaseFun');
var moment=require("moment");
router.get('/', function(req, res, next) {
	if(req.session.logFlag)
	res.render('post');
	else
	res.redirect('login');
});
router.use('/articlePost', function(req, res, next) {
	var catId=req.body['catId'];
	var summary=req.body['summary'];
	var title=req.body['title'];
	var content_html=req.body['content_html'];
	var time=moment().format('YYYY-MM-DD H:mm:ss');
	console.log(time);
	mysqlFun.insert('insert into article(catId,summary,title,content_html,time) value ("'+catId+'","'+summary+'","'+title+'","'+content_html+'","'+time+'")',function(isRight){
		if(isRight==1)
			res.status(200).send("1");
		else res.status(200).send("2");
	});
	
});
module.exports = router;