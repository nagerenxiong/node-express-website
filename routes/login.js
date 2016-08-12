var express = require('express');
var router = express.Router();
var mysqlFun = require('../model/mysqlBaseFun');
router.get('/', function(req, res, next) {
	res.render('login',{userFag:true});
});
router.post('/check', function(req, res, next) {
	var username=req.body['name'];
	var pass=req.body['pass'];
	console.log(username);
	console.log(pass);
	if(username=="admin"&&pass=="123456")
	{
		req.session.logFlag=123;
		res.redirect("/admin");
	}
	else{
		res.render("login",{userFag:false});
	}
});
module.exports = router;

