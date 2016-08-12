//日期-----------------------------------------------------------
var choice_time = getDateStr(new Date());
var datastr = choice_time.replace(/-/gm, '/');
var curDate = new Date();
//根据传入的值,获取当时日期
function cur_data(datastr) {
    var time = new Date(datastr.replace(/-/g,   "/"));
    for (var i = 0; i <= 6; i++) {
        time.setDate(time.getDate() - time.getDay() + i + 1);
        var xx = getDateStr(time);
        $("#weeks_item_" + i).html(xx);
        if (xx == choice_time) {
            $("#weeks_item_" + i).parent().addClass("cur");
        }
    }
    $("#weeks_item_0")[0].click();
}

//获取日期打印到html中
function getDateStr(d) {
    return d.getFullYear() + '-' + (add_zero(d.getMonth() + 1)) + '-' + add_zero(d.getDate());
}

//下周日期
function pre_week() {
    fli = $("#weeks_item_0").text();
    var pre = (fli.substring(0, 10)).replace(/-/gm, '/');
    // console.log(fli);
    var pre_data = creatdata(pre, -2);
    cur_data(pre_data)
}

//上周日期
function next_week() {
    fli = $("#weeks_item_6").text();
    // $("#weeks_item_0")[0].click();
    var pre = (fli.substring(0, 10)).replace(/-/gm, '/');
    // console.log(pre);
    var next_data = creatdata(pre, 1);
    cur_data(next_data);
}

//处理时间,并组装时间
function creatdata(pre, AddDayCount) {
    // console.log(pre);
    var dd = new Date(pre);
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 

    var y = dd.getFullYear();
    // console.log(y)
    var m = add_zero(dd.getMonth() + 1);
    var d = add_zero(dd.getDate());

    var pre_weeks = y + '-' + m + '-' + d;
    // console.log(pre_weeks);
    return pre_weeks
}


//时间单数在前面加0
function add_zero(gets) {
    var str = '';
    if (gets.toString().length == 1) {
        str += '0' + gets;
    } else {
        str += gets;
    };
    return str;
}
cur_data(datastr);
//--------------------------------------------------------------



//遍历li添加conclick事件,加载数据
$(".list_dates li").click(function() {
    $(".list_dates li").removeClass('cur');
    $(this).addClass('cur');
})


function filterData() {
    var curDate = $(".cr_day.list_dates .cur span").text();
    var countyArray = getCountyArray($('.cr_country'));
    var implementStr = getCountyArray($('.cr_degree'));

    $(".da_form:eq(0) tr:gt(0) span").hide();
    $(".da_form:eq(0) tr:gt(0)").hide();
    // $(".da_form:eq(0) tr:gt(0)").hide().each(function(index, el) {
    //     for (var i = 0; i < countyArray.length; i++) {
    //         for (var j = 0; j < implementStr.length; j++) {
    //             console.log(el);


    //             $(el).show().children('td:gt(1)').each(function(eindex, eel) {
    //                 $(eel).children('span').eq()
    //                 if ($(el).children('.da_logo').attr('data-c') == countyArray[i] && $(el).children('.da_import').children('.importSpan').attr('data-i') == implementStr[j]) {
    //                     var gindex = $(el).children('.da_import').children('.importSpan');

    //                 }
    //             })

    //         }
    //     }
    //     $(".importSpan").each(function(index, el) {
    //         for (var i = 0; i < countyArray.length; i++) {
    //             for (var j = 0; j < implementStr.length; j++) {
    //                 console.log(el);

    //             }
    //         }
    //     })

    //     if ($(".cr_country a.cr_all").hasClass('cr_check')) {
    //         $(".da_form:eq(0) tr:gt(0)").show();
    //     }
    // });

    $(".importSpan").each(function(index, el) {
        for (var i = 0; i < countyArray.length; i++) {
            for (var j = 0; j < implementStr.length; j++) {
                // console.log(el);
                if ($(el).parent().siblings('.da_logo').attr('data-c') == countyArray[i] && $(el).attr('data-i') == implementStr[j]) {
                    var elindex = $(el).parent().children('span').index(el);
                    $(el).show().parent().parent().show();
                    $(el).parent().parent().children('td').eq(2).children('span').eq(elindex).show();
                    $(el).parent().parent().children('td').eq(4).children('span').eq(elindex).show();
                    $(el).parent().parent().children('td').eq(5).children('span').eq(elindex).show();
                    $(el).parent().parent().children('td').eq(6).children('span').eq(elindex).show();
                    $(el).parent().parent().children('td').eq(7).children('span').eq(elindex).show();
                }
            }
        }
    })
}

function filterCategory() {
    var parentAll = $(".da_judge").children('span');
    var cr_categoryStr = getCountyArray($('.cr_category'));
    var cateWaihui = "美元_日元_英镑_澳元_纽元_新加坡元_港币_欧元_加元_瑞郎_人民币";
    var cateYuanyou = "石油";
    var cateJinYing = "金银";
    parentAll.each(function(index, el) {
        $(el).children('em').hide().children('b').hide();
    })
    var asdf = 0;
    $(".da_judge").children('span').children('em').hide().children('b').each(function(index1, el1) {
        asdf++;
        for (var i = 0; i < cr_categoryStr.length; i++) {
            var cateName = "";
            if (cr_categoryStr[i] == "外汇")
                cateName = cateWaihui;
            else if (cr_categoryStr[i] == "原油")
                cateName = cateYuanyou;
            else if (cr_categoryStr[i] == "贵金属")
                cateName = cateJinYing;
            var dataType = $(el1).attr('data-type');
            if (cateName.indexOf(dataType) >= 0) {
                $(el1).show().parent().show();
            }
        }
    });
}


function getCountyArray(selector) {
    var cArray = [];
    var allCheckFlag = (selector.children('a').hasClass('cr_check')) ? true : false;
    if (allCheckFlag) {
        selector.children('li').children('a').each(function(index, el) {
            cArray.push($(el).text());
        });
        return cArray;
    } else {

        selector.children('li.cr_check').each(function(index, el) {
            cArray.push($(el).children('a').text());
        });
        return cArray;
    }

}

$(".cr_category a:eq(0),.cr_country a:eq(0),.cr_degree a:eq(0)").addClass("cr_check");
$(".cr_category li").click(function() {
    var li_len = $(".cr_category li").length;
    var num = 0;

    if ($(this).hasClass("cr_check")) {
        $(this).removeClass("cr_check");
    } else {
        $(this).addClass("cr_check");
    }
    $(".cr_category li").each(function() {
        //最后一个点击，全部选中、选中时，点击一个，全部取消
        if ($(this).hasClass("cr_check")) {
            num++;
            if (li_len != num) {
                $(".cr_category .cr_all").removeClass("cr_check");
            }
        }
        if($(".cr_category li.cr_check").length==0)
                {
                    $(".cr_category .cr_all").addClass("cr_check");
                }
    })

    filterCategory();
})

$(".cr_country li").click(function() {
    var li_len = $(".cr_country li").length;
    var num = 0;

    if ($(this).hasClass("cr_check")) {
        $(this).removeClass("cr_check");
    } else {
        $(this).addClass("cr_check");
    }
    $(".cr_country li").each(function() {
        //最后一个点击，全部选中、选中时，点击一个，全部取消
        if ($(this).hasClass("cr_check")) {
            num++;
            if (li_len != num) {
                $(".cr_country .cr_all").removeClass("cr_check");
            } 
        }
        if($(".cr_country li.cr_check").length==0)
                {
                    $(".cr_country .cr_all").addClass("cr_check");
                }
    })
    filterData();
    filterCategory();
})

$(".cr_degree li").click(function() {
        var li_len = $(".cr_degree li").length;
        var num = 0;

        if ($(this).hasClass("cr_check")) {
            $(this).removeClass("cr_check");
        } else {
            $(this).addClass("cr_check");
        }
        $(".cr_degree li").each(function() {
            //最后一个点击，全部选中、选中时，点击一个，全部取消
            if ($(this).hasClass("cr_check")) {
                num++;
                if (li_len != num) {
                    $(".cr_degree .cr_all").removeClass("cr_check");
                }
            }
             if($(".cr_degree li.cr_check").length==0)
                {
                    $(".cr_degree .cr_all").addClass("cr_check");
                }   
        })
        filterData();
        filterCategory();
    })
    //全部
$(".cr_category .cr_all").click(function() {
    if (!$(this).hasClass("cr_check")) {
        $(this).addClass("cr_check");
        $(".cr_category li").removeClass("cr_check");
        filterData();
        filterCategory();
    }
    filterData();
    filterCategory();
})
$(".cr_country .cr_all").click(function() {
    if (!$(this).hasClass("cr_check")) {
        $(this).addClass("cr_check");
        $(".cr_country li").removeClass("cr_check");
        filterData();
        filterCategory();
    }
    filterData();
    filterCategory();
})
$(".cr_degree .cr_all").click(function() {
    if (!$(this).hasClass("cr_check")) {
        $(this).addClass("cr_check");
        $(".cr_degree li").removeClass("cr_check");
        filterData();
        filterCategory();
    }

})
$(".io_line").hover(function() {
    var imgPos = $(".io_dd").position();
    if (Math.abs(imgPos.top) % 200 == 0) {
        if (imgPos.top != -1000) {
            $(".io_dd").animate({
                top: (imgPos.top - 200) + "px"
            })
        }
    }
})

//更改日期
$(".cr_day.list_dates li").click(function() {
    var curDate = $(this).children('span').text();
    updateData(curDate);
})

function updateDateEvent(curDate) {
    $(".list_dates li.cur").removeClass("cur");
    var time = new Date(curDate);
    for (var i = 0; i <= 6; i++) {
        time.setDate(time.getDate() - time.getDay() + i + 1);
        var xx = getDateStr(time);
        $("#weeks_item_" + i).html(xx);
        if (xx == curDate) {
            $("#weeks_item_" + i).parent().addClass("cur");
        }
    };
    updateData(curDate);
}

function updateData(curDate) {
    $(".curDate").text(curDate.toString());
    $(".laydate-icon").val(curDate);
    $.ajax({
        type: 'get',
        dataType: "json",
        url: '/calendar/update?date=' + curDate,
        success: function(req) {
            $(".da_form:eq(0) tr:gt(0)").remove();
            $(".da_form:eq(1) tr:gt(0)").remove();
            $(".da_form:eq(2) tr:gt(0)").remove();
            var data = req.EconomicCalendars;
            var ImportThings = req.ImportThings;
            var HolidayNotices = req.HolidayNotices;
            for (var i = 0; i < data.length; i++) {
                var trStr = '<tr><td>' + data[i]["PredictTime"] + '</td><td class="da_logo" data-c="' + data[i]["State"] + '">';
                if (data[i]["State"] == "美国") {
                    trStr += '<img src="images/cr_cy01.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "中国") {
                    trStr += '<img src="images/cr_cy02.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "欧盟") {
                    trStr += '<img src="images/cr_cy03.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "日本") {
                    trStr += '<img src="images/cr_cy04.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "澳大利亚") {
                    trStr += '<img src="images/cr_cy05.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "英国") {
                    trStr += '<img src="images/cr_cy06.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "加拿大") {
                    trStr += '<img src="images/cr_cy07.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "瑞士") {
                    trStr += '<img src="images/cr_cy08.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "台湾") {
                    trStr += '<img src="images/cr_cy09.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "香港") {
                    trStr += '<img src="images/cr_cy09.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "新西兰") {
                    trStr += '<img src="images/cr_cy09.jpg" width="21" height="14">'
                } else if (data[i]["State"] == "西班牙") {
                    trStr += '<img src="images/xby.png" width="21" height="14">'
                } else if (data[i]["State"] == "韩国") {
                    trStr += '<img src="images/hg.png" width="21" height="14">'
                } else if (data[i]["State"] == "意大利") {
                    trStr += '<img src="images/ydl.png" width="21" height="14">'
                } else if (data[i]["State"] == "法国") {
                    trStr += '<img src="images/fg.png" width="21" height="14">'
                } else if (data[i]["State"] == "德国") {
                    trStr += '<img src="images/dg.png" width="21" height="14">'
                } else if (data[i]["State"] == "希腊") {
                    trStr += '<img src="images/xl.png" width="21" height="14">'
                } else if (data[i]["State"] == "欧元区") {
                    trStr += '<img src="images/oyq.png" width="21" height="14">'
                }
                trStr += '</td><td>';
                for (var j = i; j < data.length; j++) {
                    if (data[i]["PredictTime"] == data[j]["PredictTime"] && data[i]["State"] == data[j]["State"]) {
                        trStr += '<span title="' + data[j]["NFI"] + '">' + data[j]["State"] + data[j]["NFI"] + '</span>';
                    }
                }
                trStr += '</td><td class="da_import" >';
                for (var j = i; j < data.length; j++) {
                    if (data[i]["PredictTime"] == data[j]["PredictTime"] && data[i]["State"] == data[j]["State"]) {
                        trStr += '<span class="da_mid importSpan" data-i="' + data[j]["Nature"] + '">';
                        if (data[j]["Nature"] == "高") {
                            trStr += '<img src="images/ix_degree2.jpg" width="28" height="22">'
                        } else if (data[j]["Nature"] == "中") {
                            trStr += '<img src="images/ix_degree.jpg" width="28" height="22">'
                        } else if (data[j]["Nature"] == "低") {
                            trStr += '<img src="images/ix_degree3.jpg" width="28" height="22">'
                        }
                        trStr += '</span>';
                    }
                }
                trStr += '</td><td>';
                for (var j = i; j < data.length; j++) {
                    if (data[i]["PredictTime"] == data[j]["PredictTime"] && data[i]["State"] == data[j]["State"]) {
                        trStr += '<span>' + data[j]["Before"] + '</span>';
                    }
                }
                trStr += '</td><td>';
                for (var j = i; j < data.length; j++) {
                    if (data[i]["PredictTime"] == data[j]["PredictTime"] && data[i]["State"] == data[j]["State"]) {
                        trStr += '<span>' + data[j]["Forecast"] + '</span>';
                    }
                }
                trStr += '</td><td>';
                for (var j = i; j < data.length; j++) {
                    if (data[i]["PredictTime"] == data[j]["PredictTime"] && data[i]["State"] == data[j]["State"]) {
                        trStr += '<span>' + data[j]["Reality"] + '</span>';
                    }
                }
                trStr += '</td><td class="da_judge">';
                for (var j = i; j < data.length; j++) {
                    if (data[i]["PredictTime"] == data[j]["PredictTime"] && data[i]["State"] == data[j]["State"]) {

                        if (data[j]["Effect"] == "||") {
                            trStr += '<span  style="font-size: 12px;color:#FD9525">影响较小</span>';
                        }
                        var index = data[j]["Effect"].indexOf("|");
                        var ld = data[j]["Effect"].substring(0, index).replace(/\|/g, "");
                        var lk = data[j]["Effect"].substring(index).replace(/\|/g, "");
                        if (ld != "" && ld.length != 0) {
                            var ldArray = ld.split(" ");
                            var lkArray = lk.split(" ");

                            trStr += '<span style="font-size: 12px;"><em style="color:red">利多: ';
                            for (var k = 0; k < ldArray.length; k++) {
                                trStr += '<b data-type="' + ldArray[k] + '"" style="color:red">' + ldArray[k] + '</b>';
                            }
                            trStr += '</em>';
                            if (lk != "" && lk.length != 0) {
                                trStr += '<em style="color:green">利空:';
                                for (var k = 0; k < lkArray.length; k++) {
                                    trStr += ' <b data-type="' + lkArray[k] + '"" style="color:green">' + lkArray[k] + '</b>';
                                }
                                trStr += '</em>';
                            }
                            trStr += '</span>';
                        } else {
                            if (lk != "" && lk.length != 0) {
                                var lkArray = lk.split(" ");
                                trStr += '<span  style="font-size: 12px;"><em style="color:green">利空: ';
                                for (var k = 0; k < lkArray.length; k++) {
                                    trStr += ' <b data-type="' + lkArray[k] + '"" style="color:green">' + lkArray[k] + '</b>';
                                }
                                trStr += "</em></span>";
                            }
                            else{
                                if(data[j]["Effect"]!="||"){
                                    trStr+='<span></span>';
                                }
                            }
                        }
                        i = j;
                    }
                }
                trStr += '</td></tr>';
                if (i == 28) {
                    // debugger;
                }
                $(".da_form:eq(0) tbody").append(trStr);
            }
            var importStr = "";
            if (ImportThings.length > 0) {
                for (var i = 0; i < ImportThings.length; i++) {
                    importStr += '<tr>';
                    importStr += '<td>' + ImportThings[i]["PredictTime"] + '</td>';
                    importStr += '<td>' + ImportThings[i]["State"] + '</td>';
                    importStr += '<td><span title="--">--</span></td><td class="da_import"><span class="da_mid" >';
                    if (ImportThings[i]["Nature"] == "高") {
                        importStr += '<img src="images/ix_degree2.jpg"  width="28" height="22">'
                    } else if (ImportThings[i]["Nature"] == "中") {
                        importStr += '<img src="images/ix_degree.jpg"  width="28" height="22">'
                    } else if (ImportThings[i]["Nature"] == "低") {
                        importStr += '<img src="images/ix_degree3.jpg"  width="28" height="22">'
                    }
                    importStr += '</span> </td> <td>' + ImportThings[i]["NFI"] + '</td></tr>';

                }
            } else {
                importStr += '<tr><td colspan="5">今天无重要大事预告公布！</td> </tr>';
            }
            $(".da_form:eq(1) tbody").append(importStr);
            var HolidayStr = "";
            if (HolidayNotices.length > 0) {
                for (var i = 0; i < HolidayNotices.length; i++) {
                    HolidayStr += '<tr>';
                    HolidayStr += '<td>' + HolidayNotices[i]["PredictTime"] + '</td>';
                    HolidayStr += '<td>' + HolidayNotices[i]["State"] + '</td>';
                    HolidayStr += '<td><span title="--">--</span></td><td class="da_import"><span class="da_mid">';
                    if (HolidayNotices[i]["Nature"] == "高") {
                        HolidayStr += '<img src="images/ix_degree2.jpg"  width="28" height="22">'
                    } else if (HolidayNotices[i]["Nature"] == "中") {
                        HolidayStr += '<img src="images/ix_degree.jpg"  width="28" height="22">'
                    } else if (HolidayNotices[i]["Nature"] == "低") {
                        HolidayStr += '<img src="images/ix_degree3.jpg"  width="28" height="22">'
                    }
                    HolidayStr += '</span> </td> <td>' + HolidayNotices[i]["NFI"] + '</td></tr>';

                }
            } else {
                HolidayStr += '<tr><td colspan="5">今天无重要节日预告公布！</td> </tr>';
            }
            $(".da_form:eq(2) tbody").append(HolidayStr);
            filterData();
            filterCategory();
        }
    })
}