// JavaScript Document
$(document).ready(function() {
	//index.html
	
	/*桌面通知*/
	var bg_off = 0;
	$(".ix_li3").click(function() {
		if (bg_off == 0) {
			$(this).css("background-image", "url(images/ix_off.jpg)");
			bg_off = 1;
		} else {
			$(this).css("background-image", "url(images/ix_on.jpg)");
			bg_off = 0;
		}
	})
	var bg_off1 = 0;
	$(".ix_li4").click(function() {
			if (bg_off1 == 0) {
				$(this).css("background-image", "url(images/ix_off.jpg)");
				bg_off1 = 1;
			} else {
				$(this).css("background-image", "url(images/ix_on.jpg)");
				bg_off1 = 0;
			}
		})
		/*商品 外汇 股指*/
	$(".ix_dd dd:first").css("display", "block");
	$(".ix_goods dt a").click(function() {
			var x = $(this).index();
			$(".ix_goods dt a").removeClass("ix_gs_br");
			$(this).addClass("ix_gs_br");

			$(".ix_dd dd").hide();
			$(".ix_dd dd").eq(x).show();
		})
		//infor.html
	
		/*行情*/
	$(".io_dl dl").css("display", "none");
	$(".io_dl dl:first").css("display", "block");
	$(".io_title li").click(function() {
			var x = $(this).index();
			$(".io_title li").find("a").removeClass("io_te_check");
			$(this).find("a").addClass("io_te_check");

			$(".io_dl dl").hide();
			$(".io_dl dl").eq(x).show();

		})
		//market.html
		//主要报价
		// $(".mt_dd dd:first").addClass("mt_color");
		// $(".mt_dl dl:first").css("display","block");
		// $(".mt_dd dd").click(function(){
		// 		var x=$(this).index();
		// 		$(".mt_dd dd").removeClass("mt_color");
		// 		$(this).addClass("mt_color");

	// 		$(".mt_dl dl").hide();
	// 		$(".mt_dl dl").eq(x).show();		

	// 	})
	//calendar.html
	//财经日历-单选
	



})