var express = require('express');
var router = express.Router();
var request = require('request');
var mysqlFun = require('../model/mysqlBaseFun');
var moment = require("moment");
router.get('/', function(req, res, next) {
	if(req.session.logFlag)
	res.render('admin');
	else
	res.redirect('login');
});
router.get('/loginout', function(req, res, next) {
	req.session = null;
	res.redirect('/login');
});
router.get('/:page/:catId', function(req, res, next) {
 
	var page = (req.params['page']-1) * 10;
	
	var catId=req.params['catId'];
	var sql=sql1="";
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
		}
		mysqlFun.query(sql1, function(pageR) {
			res.json({
				articleList: rows,
				pages: parseInt(pageR[0].pages / 10)
			});
		})
	});
});
router.use('/delete',function(req,res,next){
		console.log(req.body["idListStr"]);
	var arrId=req.body["idListStr"];
	var sql="DELETE  FROM article WHERE id IN ("+arrId+")";
	mysqlFun.query(sql, function(rows) {
		res.send("success");
	});
})



module.exports = router;