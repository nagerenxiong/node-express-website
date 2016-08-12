var express = require('express');
var router = express.Router();
var request = require('request');
var mysqlFun=require('../model/mysqlBaseFun');
var moment=require("moment");
router.get('/:id', function(req, res, next) {
	var id=req.params['id'];
	mysqlFun.query("select * from article where id="+id, function(rows) {
		for (var i = 0; i < rows.length; i++) {
			rows[i]['time'] = moment(rows[i]['time']).format('YYYY-MM-DD HH:mm:ss');
			rows[i]['content_html']=rows[i]['content_html'].replace(/\%\$\%/g,"\"");
		}
		console.dir(rows);
		res.render('edit',{article:rows});

	});
});
module.exports = router;