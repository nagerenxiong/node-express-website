function getCookie(c_name) {
    var arr, reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
function setCookie(c_name, value, expiredays) {　　　　
    var exdate = new Date();　　　　
    exdate.setDate(exdate.getDate() + expiredays);　　　　
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());　　
}
$(function() {
    $(".mt_right dd:odd").css("background-color", "#f4f4f4");
    $(".quote_menu dl dd i").hover(function() {
        //$(this).addClass("cur");
        $(this).find(".show_list").css("display", "block");
    }, function() {
        //$(this).removeClass("cur");
        $(this).find(".show_list").css("display", "none");
    });


var wsServer = "ws://114.215.194.241:9504";
    var websocket = new WebSocket(wsServer);
    websocket.onopen = function(evt) {
        var msg = {
            'type': 'client',
            'code': codeStr,
            'crypt': crypt
        };
        var jsonmsg = JSON.stringify(msg);
        websocket.send(jsonmsg);
    };

    websocket.onclose = function(evt) {
    };
    websocket.onmessage = function(evt) {
        try {
            var data = JSON.parse(evt.data);
        } catch (error) {
            return false;
        }
       console.log(data);
        if ($(".mt_right dd").hasClass(data.code)) {
            upData(data);
        }
    };
    websocket.onerror = function(evt, e) {
    };



    switch (type) {
        case 2:
        case 3:
        case 5:
        case 6:
            $(".quote_menu dl dd i").eq(0).addClass("cur");
            break;
        case 7:
        case 8:
            $(".quote_menu dl dd i").eq(1).addClass("cur");
            break;
        case 9:
            $(".quote_menu dl dd a").eq(7).addClass("cur");
            break;
        default:
            $(".quote_menu dl dd a").eq(0).addClass("cur");
            break;
    }

    // var wsReconnect = function() {
    //     this.ws = null;
    //     this.timeInterval;
    //     var local = this;
    //     this.debug = true;
    //     this.dataHqLoginString = 'ws://121.41.47.113:8181/connectMarket';
    //     //this.loginS = codeStr
    //     this.log = function(msg) {
    //         if (this.debug) {
    //             console.log(msg);
    //         }
    //     }
    //     this.sendHeartbeat = function() {
    //         msg = new Object();
    //         msg.cmd = 'heartbeat';
    //         msg.data = ""
    //             //local.log(local.ws)
    //         try {
    //             local.connect();
    //             local.ws.send(JSON.stringify(msg));
    //         } catch (e) {
    //             local.log(e.name + ": " + e.message);
    //         }
    //         //local.log("sendHeartbeat");
    //     }
    //     this.listenEvent = function() {
    //         /**
    //          * 连接建立时触发
    //          */
    //         local.ws.onopen = function(e) {
    //             //连接成功
    //             //local.log("connect webim server success.");
    //             //发送登录信息
    //             //local.reLogin();
    //         };
    //         //有消息到来时触发
    //         local.ws.onmessage = function(e) {
    //             //local.log(e);
    //             var data = JSON.parse(e.data);
    //             console.log(data);
    //             if ($(".mt_right dd").hasClass(data.C)) {
    //                 upData(data);
    //             }
    //             //                    if(data.C==nowblt)
    //             //                    {
    //             //                        data.C="OIL";
    //             //                        data.N="布伦特原油";
    //             //                        upData(data);
    //             //                    } 
    //         };
    //         /**
    //          * 连接关闭事件
    //          */
    //         local.ws.onclose = function(e) {
    //             //local.log("onclose:" + e);
    //             //local.log("clearInterval:" + local.timeInterval);
    //             //clearInterval(timeInterval);
    //             //
    //             //                setTimeout(function(){
    //             //                    var wsr = new wsReconnect();
    //             //                    wsr.connect();
    //             //                },1000*5);
    //         };
    //         /**
    //          * 异常事件
    //          */
    //         local.ws.onerror = function(e) {
    //             //alert("异常:" + e.data);
    //             local.log("onerror" + e);
    //             //                local.timeInterval = setTimeout(function(){
    //             //                        local.sendHeartbeat();
    //             //                },1000*60);
    //         };
    //     }
    //     this.connect = function() {
    //         // document.cookie = "";
    //         //local.log("connect");
    //         $.get("http://localhost/token/fun.php?flag="+tokenCode+"&v=" + Math.round(new Date().getTime() / 1000), function(data, status) {
    //             if (data !== 0) {
    //                 setCookie("hqToken", data);
    //                 if (typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3) {
    //                     if (window.WebSocket || window.MozWebSocket) {
    //                         local.ws = new WebSocket(local.dataHqLoginString+"?token="+data);
    //                         local.listenEvent();
    //                     } else if (1) {
    //                         WEB_SOCKET_SWF_LOCATION = "http://www.cnoil.com/img/js/quotes/WebSocketMain.swf?v=" + Math.round(new Date().getTime() / 1000);
    //                         $.getScript("http://www.cnoil.com/img/js/quotes/swfobject.js", function() {
    //                             $.getScript("http://www.cnoil.com/img/js/quotes/web_socket.js", function() {
    //                                 local.ws = new WebSocket(local.dataHqLoginString + "?token=" +  data);
    //                                 local.listenEvent();
    //                             });
    //                         });
    //                     }
    //                 }
    //             }
    //         });
    //     }
    // }
    // var wsr = new wsReconnect();
    // wsr.connect();
});

// function isSelect(data) {
//     if (!data.C) {
//         return false;
//     }
//     if ($(".mt_right dd").hasClass(data.code)) {
//         upData(data);
//     } else {
//         addData(data);
//     }
// }

function getZd(p, lc) {
    p = p.toString();
    lc = lc.toString();
    var len1 = p.indexOf(".");
    if (len1 > -1) {
        len1 = p.substring(len1 + 1).length;
    } else {
        len1 = 0;
    }
    var len2 = lc.indexOf(".");
    if (len2 > -1) {
        len2 = lc.substring(len2 + 1).length;
    } else {
        len2 = 0;
    }
    var len = len2;
    if (len1 >= len2) {
        len = len1;
    }
    var num = Math.pow(10, len);
    var zd = (p * num - lc * num) / num;
    zd = zd.toFixed(len);

    var zdf = ((zd * num) / (lc * num)) * 100;
    zdf = zdf.toFixed(2);
    var result = [zd, zdf];
    return result;
}

// 将数据更新在table里
function upData(data) {
    for (var key in data) {
        var ele = $(" .mt_right ." + data.code + ' .' + key);
        var curDate = new Date();
        var currentTime = curDate.toLocaleTimeString().substring(2);
        if (key == 'quoteTime') {
            ele.text(data.quoteTime.substr(9));
        } else {
            if (key == 'last') {
                var obj1 = $(" .mt_right ." + data.code + ' .swing');
                var obj2 = $(" .mt_right ." + data.code + ' .swingRange');
                ele.removeClass('gr_');
                ele.removeClass('r_');
                obj1.removeClass('gr_');
                obj1.removeClass('r_');
                obj2.removeClass('gr_');
                obj2.removeClass('r_');

                var v = getZd(data.last, data.lastClose);
                var zd = v[0];
                var zdf = v[1];
                var n = "";
                if (zd < 0) {
                    flashColor(ele, 'green');
                    flashColor(obj1, 'green');
                    ele.addClass('gr_');
                    obj1.addClass('gr_');
                    obj2.addClass('gr_');
                } else if (zd > 0) {
                    flashColor(ele, 'red');
                    flashColor(obj1, 'red');
                    ele.addClass('r_');
                    obj1.addClass('r_');
                    obj2.addClass('r_');
                    n = "+";
                }
                obj1.text(n + data.swing);
                obj2.text(n + data.swingRange + "%");
            }
            ele.text(data[key]);
        }
    }
}
// 添加表格行和数据
function addData(data) {
    var url = hqinfourl;

    $.each(json[code], function(k, v) {
        if (data.C == v.code) {
            url += v.url;
            return false;
        }
    });

    var html = "";
    if (($(".mt_right dd").size() - 1) % 2 == 0) {
        html = '<li class="' + data.C + '" code="' + data.C + '" style="background-color: rgb(244, 244, 244);">';
    } else {
        html = '<li class="' + data.C + '" code="' + data.C + '">';
    }

    html += "<span class='pName'><a href='" + url + "' target='_blank'>" + data.N + "</a></span>";

    if (data.ZD.substr(0, 1) == '-') {
        html += "<span class='price1 P gr_'>" + data.P + "</span>";
        html += "<span class='diffprice1 ZD gr_'>" + data.ZD + "</span>";
        html += "<span class='diffcenti ZDF gr_'>" + data.ZDF + "</span>";
    } else if (data.ZD != '0') {
        html += "<span class='price1 P r_'>" + data.P + "</span>";
        html += "<span class='diffprice1 ZD r_'>+" + data.ZD + "</span>";
        html += "<span class='diffcenti ZDF r_'>+" + data.ZDF + "</span>";
    } else {
        html += "<span class='price1 P '>" + data.P + "</span>";
        html += "<span class='diffprice1 ZD '>" + data.ZD + "</span>";
        html += "<span class='diffcenti ZDF '>" + data.ZDF + "</span>";
    }
    html += "<span class='Kprice1 O'>" + data.O + "</span>";
    html += "<span class='Hprice1 H'>" + data.H + "</span>";
    html += "<span class='Lprice1 L'>" + data.L + "</span>";
    html += "<span class='Sprice1 LC'>" + data.LC + "</span>";
    html += "<span class='Ltime T'>" + new Date(data.T.replace(/-/g, "/")).Format("hh:mm:ss") + "</span>";
    html += "</li>";
    $(".mt_right ul").append(html);
}
//更新数据闪亮一下
function flashColor(ele, color) {
    if (color == 'red') {
        ele.addClass('rbcolor');
        ele.addClass('w_');
        setTimeout(function() {
            ele.removeClass('rbcolor');
            ele.removeClass('w_');
        }, 500);
    } else if (color == 'green') {
        ele.addClass('gbcolor');
        ele.addClass('w_');
        setTimeout(function() {
            ele.removeClass('gbcolor');
            ele.removeClass('w_');
        }, 500);
    }
}

function trimDate(time) {
    var arr = time.split(' ');
    return arr[1];
}

function getXghq(code) {
    var xghq = "";
    if (wti.toString().indexOf(code) > -1) {
        xghq = wti.toString();
    } else if (bulunte.toString().indexOf(code) > -1) {
        xghq = bulunte.toString();
        if (code == "OIL") {
            code = bulunte[0];
        }
    } else if (guojijin.toString().indexOf(code) > -1) {
        xghq = guojijin.toString();
    } else if (jinjiaosuo.toString().indexOf(code) > -1) {
        xghq = jinjiaosuo.toString();
    } else if (zhipan.toString().indexOf(code) > -1) {
        xghq = zhipan.toString();
    } else if (jiaochapan.toString().indexOf(code) > -1) {
        xghq = jiaochapan.toString();
    } else if (guzhi.toString().indexOf(code) > -1) {
        xghq = guzhi.toString();
    }
    xghq = xghq.split(',');
    xghq.splice($.inArray(code, xghq), 1);
    xghq.splice(0, 0, code);
    return xghq;
}

Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}