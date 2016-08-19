function getCookie(c_name) {
    var arr, reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}


function updateNews(json, kxLastid) {
    $(".ix_column dd:last").remove();
    if (json['type'] == "2") {
        var htmlStr = '<dd data-idg="' + json["id"] + '"  data-time="' + json["time"].substr(0, 10) + '" class="classTypeTwo" data-id="' + kxLastid + '"><span>' + json["time"].substr(10, 6) + '</span><div class="ix_txt">';
        if (json["state"] == "美国") {
            htmlStr += '<img src="images/cr_cy01.jpg" width="42" height="42">';
        } else if (json["state"] == "中国") {
            htmlStr += '<img src="images/cr_cy02.jpg" width="42" height="42">'
        } else if (json["state"] == "欧元区") {
            htmlStr += '<img src="images/cr_cy03.jpg" width="42" height="42">'
        } else if (json["state"] == "日本") {
            htmlStr += '<img src="images/cr_cy04.jpg" width="42" height="42">'
        } else if (json["state"] == "澳大利亚") {
            htmlStr += '<img src="images/cr_cy05.jpg" width="42" height="42">'
        } else if (json["state"] == "加拿大") {
            htmlStr += '<img src="images/cr_cy07.jpg" width="42" height="42">'
        } else if (json["state"] == "瑞士") {
            htmlStr += '<img src="images/cr_cy08.jpg" width="42" height="42">'
        } else if (json["state"] == "英国") {
            htmlStr += '<img src="images/cr_cy06.jpg" width="42" height="42">'
        } else if (json["state"] == "台湾") {
            htmlStr += '<img src="images/cr_cy09.jpg" width="42" height="42">'
        } else if (json["state"] == "韩国") {
            htmlStr += '<img src="images/hg2.png" width="42" height="42">'
        } else if (json["state"] == "德国") {
            htmlStr += '<img src="images/dg.png" width="42" height="42">'
        } else if (json["state"] == "法国") {
            htmlStr += '<img src="images/fg.jpg" width="42" height="42">'
        } else if (json["state"] == "西班牙") {
            htmlStr += '<img src="images/xby.png" width="42" height="42">'
        } else if (json["state"] == "新西兰") {
            htmlStr += '<img src="images/xxl.jpg" width="42" height="42">'
        } else if (json["state"] == "意大利") {
            htmlStr += '<img src="images/ydl2.png" width="42" height="42">'
        } else if (json["state"] == "斯洛伐克") {
            htmlStr += '<img src="images/ydl2.png" width="42" height="42">'
        } else if (json["state"] == "爱沙尼亚") {
            htmlStr += '<img src="images/asny.jpg" width="42" height="42">'
        } else if (json["state"] == "希腊") {
            htmlStr += '<img src="images/xl.png" width="42" height="42">'
        }
        htmlStr += '<div class="ix_desc"><h2>' + json["state"] + json["title"] + '</h2><span>前值：' + json["before"] + '  预期： ' + json["forecast"] + '</span></div><div class="ix_val" data-imp="' + json["importance"] + '">';
        if (json["importance"] == "高") {
            htmlStr += '<img src="images/ix_degree2.jpg" width="30" height="24">';
        } else if (json["importance"] == "中") {
            htmlStr += '<img src="images/ix_degree.jpg" width="30" height="24">';
        } else {
            htmlStr += '<img src="images/ix_degree3.jpg" width="30" height="24">';
        }
        htmlStr += '<span>实际值：' + json["reality"] + '</span></div>';
        htmlStr += '<div class="ix_effect">';
        if (json["effect"] == "||") {
            htmlStr += '<span  style="font-size: 12px;color:#FD9525">影响较小</span>'
        }
        var index = json["effect"].indexOf("|");
        var ld = json["effect"].substring(0, index).replace(/\|/g, "");
        var lk = json["effect"].substring(index).replace(/\|/g, "");
        if (ld != "" && ld.length != 0) {
            var ldArray = ld.split(" ");
            var lkArray = lk.split(" ")
            htmlStr += '<span  style="font-size: 12px;">'
            htmlStr += '<em style="color:red"> 利多: '
            for (var k = 0; k < ldArray.length; k++) {
                htmlStr += '<b data-type="' + ldArray[k] + '" style="color:red">' + ldArray[k] + '</b> ';
            }
            htmlStr += '</em>'
            if (lk != "" && lk.length != 0) {
                htmlStr += '<em style="color:green">利空:';
                for (var k = 0; k < lkArray.length; k++) {
                    htmlStr += '<b data-type="' + lkArray[k] + '" style="color:green">' + lkArray[k] + '</b> ';
                }
                htmlStr += '</em>';
            }
            htmlStr += '</span>';
        } else {
            var lkArray = lk.split(" ")
            if (lk != "" && lk.length != 0) {
                htmlStr += '<span  style="font-size: 12px;"><em style="color:green">利空: ';
                for (var k = 0; k < lkArray.length; k++) {
                    if (lkArray[k] != "") {
                        htmlStr += '<b style="color:green" data-type="' + lkArray[k] + '"> ' + lkArray[k] + '</b>';
                    }
                }
                htmlStr += '</em></span>';
            }
        }
        htmlStr += '</span>';
        htmlStr += '</div></div></dd>';
        $(".ix_column dt").after(htmlStr);
    } else {
        if (json['importance'] == "高")
            $(".ix_column dt").after('<dd class="ix_cn_dd" style="background:#eee;"><span>' + json["time"].substr(10, 6) + '</span><p>' + json["title"] + '</p></dd>');
        else
            $(".ix_column dt").after('<dd style="background:#eee;"><span>' + json["time"].substr(10, 6) + '</span><p>' + json["title"] + '</p></dd>');
        setTimeout(function() {
            $(".ix_column dd").removeAttr('style');
        }, 2000)
    }
}

document.getElementById('time').innerHTML = new Date().format('hh:mm:ss');
setInterval(function() {
    document.getElementById('time').innerHTML = new Date().format('hh:mm:ss');
}, 1000);





$(function() {

    var wsReconnect = function() {
        this.ws = null;
        this.timeInterval;

        var local = this;

        this.debug = true;

        this.dataHqLoginString = 'ws://114.215.194.79:8182/kx';
        //this.loginS = codeStr
        this.log = function(msg) {
            if (this.debug) {
                console.log(msg);
            }
        }

        this.sendHeartbeat = function() {
            msg = new Object();
            msg.cmd = 'heartbeat';
            msg.data = ""
                //local.log(local.ws)
            try {
                local.connect();
                local.ws.send(JSON.stringify(msg));
            } catch (e) {
                local.log(e.name + ": " + e.message);
            }

            //local.log("sendHeartbeat");

        }

        this.listenEvent = function() {
            /**
             * 连接建立时触发
             */
            local.ws.onopen = function(e) {
                //连接成功
                local.log("connect webim server success.");
                //发送登录信息
                //local.reLogin();
            };

            //有消息到来时触发
            local.ws.onmessage = function(e) {
                //local.log(e);
                var data = JSON.parse(e.data);
                console.log(data);

                updateNews(data, e.kxLastid);
            };

            /**
             * 连接关闭事件
             */
            local.ws.onclose = function(e) {
                //local.log("onclose:" + e);
                //local.log("clearInterval:" + local.timeInterval);
                //clearInterval(timeInterval);
                /*setTimeout(function(){
                    var wsr = new wsReconnect();
                    wsr.connect("connectNews");
                    
                    var wsrRl = new wsReconnect();
                    wsrRl.connect("connectCalendar");
                },1000*5);*/
            };

            /**
             * 异常事件
             */
            local.ws.onerror = function(e) {
                //alert("异常:" + e.data);
                //local.log("onerror"+ e.data);
                //                    local.timeInterval = setTimeout(function(){
                //                        local.sendHeartbeat();
                //                    },1000*60);
            };
        }

        this.connect = function(type) {
             $.get("http://1.nageren.sinaapp.com/fun1.php?v="+Math.round(new Date().getTime()/1000), function(data, status) {
                console.log(data);
                if (typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3) {
                    if (window.WebSocket || window.MozWebSocket) {
                        local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + data);
                        local.listenEvent();
                    } else if (1) {
                        WEB_SOCKET_SWF_LOCATION = "/javascripts/WebSocketMain.swf?v=" + Math.round(new Date().getTime() / 1000);
                        $.getScript("/javascripts/swfobject.js", function() {
                            $.getScript("/javascripts/web_socket.js", function() {
                                local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + data);
                                local.listenEvent();
                            });
                        });
                    }
                }
            })
        }
    }

    var wsr = new wsReconnect();
    wsr.connect("");












            // var wsReconnect = function() {
            //     this.ws = null;
            //     this.timeInterval;

            //     var local = this;

            //     //        this.debug = true;
            //     this.debug = false;

            //     this.dataHqLoginString = 'ws://114.215.194.79:8181/';
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
            //             local.log("connect webim server success.");
            //             //发送登录信息
            //             //local.reLogin();
            //         };

            //         //有消息到来时触发
            //         local.ws.onmessage = function(e) {
            //             //local.log(e);
            //             var data = JSON.parse(e.data);
            //             console.log(data);
            //             debugger;
            //             updateNews(data, e.kxLastid);
            //         };

            //         /**
            //          * 连接关闭事件
            //          */
            //         local.ws.onclose = function(e) {
            //             //local.log("onclose:" + e);
            //             //local.log("clearInterval:" + local.timeInterval);
            //             //clearInterval(timeInterval);
            //             //                closenum = closenum+1;
            //             //                if (closenum > 3) {
            //             //                    
            //             //                } else {
            //             setTimeout(function() {
            //                 location.reload();
            //             }, 1000 * 60 * 10);
            //             //                }
            //         };

            //         /**
            //          * 异常事件
            //          */
            //         local.ws.onerror = function(e) {
            //             //alert("异常:" + e.data);
            //             //local.log("onerror"+ e.data);
            //             //                    local.timeInterval = setTimeout(function(){
            //             //                        local.sendHeartbeat();
            //             //                    },1000*60);
            //         };
            //     }

            //     this.connect = function(type) {
            //         $.get("http://1.nageren.sinaapp.com/fun.php?v=" + Math.round(new Date().getTime() / 1000), function(data, status) {
            //             console.log(data);
            //                 if (typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3) {
            //                     if (window.WebSocket || window.MozWebSocket) {
            //                         local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + data);
            //                         local.listenEvent();
            //                     } else if (1) {
            //                         WEB_SOCKET_SWF_LOCATION = "/javascripts/WebSocketMain.swf?v=" + Math.round(new Date().getTime() / 1000);
            //                         $.getScript("/javascripts/swfobject.js", function() {
            //                             $.getScript("/javascripts/web_socket.js", function() {
            //                                 local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + data);
            //                                 local.listenEvent();
            //                             });
            //                         });
            //                     }
            //                 }
            //             })
            //         }
            //     }

            //     var wsr = new wsReconnect();
            //     wsr.connect("connectNews");

            //     var wsrRl = new wsReconnect();
            //     wsrRl.connect("connectCalendar");

});



        var wsServer = "ws://114.215.194.241:9504";
        var websocket = new WebSocket(wsServer); websocket.onopen = function(evt) {
            var msg = {
                'type': 'client',
                'code': codeStr,
                'crypt': crypt
            };
            var jsonmsg = JSON.stringify(msg);
            websocket.send(jsonmsg);
        };

        websocket.onclose = function(evt) {
            // var data = JSON.parse(evt.data);
            // console.log(data);
        };

        websocket.onmessage = function(evt) {
            try {
                var data = JSON.parse(evt.data);
            } catch (error) {
                layer.close(Loading);
                return false;
            }
            if (typeof(data.ok) != "number")
                upData(data);


            // layer.close(Loading);
        };

        websocket.onerror = function(evt, e) {};



        function upData(data) {
            var ele1 = $(" ." + data.code + ' span:eq(1)');
            var ele2 = $(" ." + data.code + ' span:eq(2)');
            ele2.removeClass('gr_');
            ele2.removeClass('r_');
            var v = getZd(data.last, data.lastClose);
            var zd = v[0];
            var zdf = v[1];
            var n = "";
            if (zd < 0) {
                flashColor(ele2, 'green');
                ele2.addClass('gr_');
            } else if (zd > 0) {
                flashColor(ele2, 'red');
                ele2.addClass('r_');
                n = "+";
            }
            ele1.text(data.last);
            ele2.text(data.swing + " | " + data.swingRange);
        }

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

        $(window).scroll(function() {
            //.dateClass
            $(".dateClass").removeClass("fixTop");
            var row = [];
            $(".dateClass").each(function() {
                row.push($(this).offset().top);
            })

            var d = $("html").scrollTop() || $("body").scrollTop();
            var sort = new Array();
            for (var i = 0; i < row.length; i++) {
                sort.push(row[i]);
            }
            sort.push(d);
            sort.sort(function(a, b) {
                return a > b ? 1 : -1
            })
            var j = -1;
            for (var i = 0; i < sort.length; i++) {
                if (d == sort[i]) {
                    j = i;
                }
            }
            j--;

            if (j >= 0) {
                $(".dateClass").eq(j).addClass("fixTop");
            }

        })

        function next_page() {
            var numpage = $(".ix_column dd").length;
            // console.log(numpage)
            var lastId = $(".ix_column dd:last").attr("data-id");
            $.ajax({
                type: 'post',
                dataType: "json",
                url: '/index/getMoreData',
                data: {
                    "LastKxid": lastId * 1
                },
                success: function(req) {
                    var currentDate = $(".ix_column dd:last").attr('data-time');
                    for (var i = req.data.length - 1; i >= 0; i--) {
                        if (numpage > 460) {
                            break;
                        }
                        if (req.data[i]["time"].substr(0, 10) != currentDate) {
                            var dateLast = req.data[i - 1]["time"].substr(0, 10);
                            var arys1 = new Array();
                            arys1 = dateLast.split('-');
                            var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
                            var dayIndex = ssdate.getDay();
                            switch (dayIndex) {
                                case 1:
                                    dayIndex = '星期一';
                                    break;
                                case 2:
                                    dayIndex = '星期二';
                                    break;
                                case 3:
                                    dayIndex = '星期三';
                                    break;
                                case 4:
                                    dayIndex = '星期四';
                                    break;
                                case 5:
                                    dayIndex = '星期五';
                                    break;
                                case 6:
                                    dayIndex = '星期六';
                                    break;
                                case 0:
                                    dayIndex = '星期天';
                                    break;
                            }
                            $(".ix_column").append('<dd class="dateClass"><p>' + dateLast + "  " + dayIndex + '</p></dd>');
                        }
                        currentDate = req.data[i]["time"].substr(0, 10);
                        if (req.data[i]["type"] != "2") {
                            if (req.data[i]["importance"] == "高") {
                                $(".ix_column").append('<dd class="ix_cn_dd" data-time="' + req.data[i]["time"].substr(0, 10) + '" data-id="' + req["kxLastid"] + '">\
                        <span>' + req.data[i]["time"].substr(10, 6) + '</span>\
                            <p>' + req.data[i]["title"] + '</p>\
                    </dd>')
                            } else {
                                $(".ix_column").append('<dd  data-id="' + req["kxLastid"] + '" data-time="' + req.data[i]["time"].substr(0, 10) + '">\
                        <span>' + req.data[i]["time"].substr(10, 6) + '</span>\
                            <p>' + req.data[i]["title"] + '</p>\
                    </dd>')
                            }
                        } else {
                            var htmlStr = '<dd data-time="' + req.data[i]["time"].substr(0, 10) + '" class="classTypeTwo" data-id="' + req["kxLastid"] + '"><span>' + req.data[i]["time"].substr(10, 6) + '</span><div class="ix_txt">';
                            if (req.data[i]["state"] == "美国") {
                                htmlStr += '<img src="images/cr_cy01.jpg" width="42" height="42">';
                            } else if (req.data[i]["state"] == "中国") {
                                htmlStr += '<img src="images/cr_cy02.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "欧元区") {
                                htmlStr += '<img src="images/cr_cy03.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "日本") {
                                htmlStr += '<img src="images/cr_cy04.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "澳大利亚") {
                                htmlStr += '<img src="images/cr_cy05.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "加拿大") {
                                htmlStr += '<img src="images/cr_cy07.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "瑞士") {
                                htmlStr += '<img src="images/cr_cy08.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "英国") {
                                htmlStr += '<img src="images/cr_cy06.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "台湾") {
                                htmlStr += '<img src="images/cr_cy09.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "韩国") {
                                htmlStr += '<img src="images/hg2.png" width="42" height="42">'
                            } else if (req.data[i]["state"] == "德国") {
                                htmlStr += '<img src="images/dg.png" width="42" height="42">'
                            } else if (req.data[i]["state"] == "法国") {
                                htmlStr += '<img src="images/fg.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "西班牙") {
                                htmlStr += '<img src="images/xby.png" width="42" height="42">'
                            } else if (req.data[i]["state"] == "新西兰") {
                                htmlStr += '<img src="images/xxl.jpg" width="42" height="42">'
                            } else if (req.data[i]["state"] == "意大利") {
                                htmlStr += '<img src="images/ydl2.png" width="42" height="42">'
                            } else if (req.data[i]["state"] == "斯洛伐克") {
                                htmlStr += '<img src="images/ydl2.png" width="42" height="42">'
                            } else if (req.data[i]["state"] == "爱沙尼亚") {
                                htmlStr += '<img src="images/asny.jpg" width="42" height="42">'
                            }
                            htmlStr += '<div class="ix_desc"><h2>' + req.data[i]["state"] + req.data[i]["title"] + '</h2><span>前值：' + req.data[i]["before"] + '  预期： ' + req.data[i]["forecast"] + '</span></div><div class="ix_val" data-imp="' + req.data[i]["importance"] + '">';
                            if (req.data[i]["importance"] == "高") {
                                htmlStr += '<img src="images/ix_degree2.jpg" width="30" height="24">';
                            } else if (req.data[i]["importance"] == "中") {
                                htmlStr += '<img src="images/ix_degree.jpg" width="30" height="24">';
                            } else {
                                htmlStr += '<img src="images/ix_degree3.jpg" width="30" height="24">';
                            }
                            htmlStr += '<span>实际值：' + req.data[i]["reality"] + '</span></div>';
                            htmlStr += '<div class="ix_effect">';
                            if (req.data[i]["effect"] == "||") {
                                htmlStr += '<span  style="font-size: 12px;color:#FD9525">影响较小</span>'
                            }
                            var index = req.data[i]["effect"].indexOf("|");
                            var ld = req.data[i]["effect"].substring(0, index).replace(/\|/g, "");
                            var lk = req.data[i]["effect"].substring(index).replace(/\|/g, "");
                            if (ld != "" && ld.length != 0) {
                                var ldArray = ld.split(" ");
                                var lkArray = lk.split(" ")
                                htmlStr += '<span  style="font-size: 12px;">'
                                htmlStr += '<em style="color:red"> 利多: '
                                for (var k = 0; k < ldArray.length; k++) {
                                    htmlStr += '<b data-type="' + ldArray[k] + '" style="color:red">' + ldArray[k] + '</b> ';
                                }
                                htmlStr += '</em>'
                                if (lk != "" && lk.length != 0) {
                                    htmlStr += '<em style="color:green">利空:';
                                    for (var k = 0; k < lkArray.length; k++) {
                                        htmlStr += '<b data-type="' + lkArray[k] + '" style="color:green">' + lkArray[k] + '</b> ';
                                    }
                                    htmlStr += '</em>';
                                }
                                htmlStr += '</span>';
                            } else {
                                var lkArray = lk.split(" ")
                                if (lk != "" && lk.length != 0) {
                                    htmlStr += '<span  style="font-size: 12px;"><em style="color:green">利空: ';
                                    for (var k = 0; k < lkArray.length; k++) {
                                        if (lkArray[k] != "") {
                                            htmlStr += '<b style="color:green" data-type="' + lkArray[k] + '"> ' + lkArray[k] + '</b>';
                                        }
                                    }
                                    htmlStr += '</em></span>';
                                }
                            }
                            htmlStr += '</span>';
                            htmlStr += '</div></div></dd>';
                            $(".ix_column").append(htmlStr);
                        }

                    }
                    filterCategory();
                }
            })
        }

        /*信息种类*/
        $(".ix_li1 a,.ix_li2 a").click(function() {
            if ($(this).hasClass("ix_gou")) {
                $(this).removeClass("ix_gou");
            } else {
                $(this).addClass("ix_gou");
            }
            filterCategory();
            filterCategory1();
        })

        function filterCategory() {
            var checkbox = $(".ix_check .ix_li2 .ix_gou");
            var arrayBox = [];
            checkbox.each(function(index, el) {
                arrayBox.push($(el).text());
            })
            $(".classTypeTwo").hide();
            $(".classTypeTwo").each(function(index, el) {
                for (var i = 0; i < arrayBox.length; i++) {
                    if (arrayBox[i] == $(el).find('.ix_val').attr('data-imp')) {
                        $(el).show();
                    }
                }
            });
        }

        function filterCategory1() {
            var parentAll = $(".ix_effect").children('span');
            var cr_categoryStr = getCountyArray($('.ix_check .ix_li1'));
            var cateWaihui = "美元_日元_英镑_澳元_纽元_新加坡元_港币_欧元_加元_瑞郎";
            var cateYuanyou = "石油";
            var cateJinYing = "金银";
            parentAll.each(function(index, el) {
                $(el).children('em').hide().children('b').hide();
            })
            $(".ix_effect").children('span').children('em').hide().children('b').each(function(index1, el1) {
                for (var i = 0; i < cr_categoryStr.length; i++) {
                    var cateName = "";
                    if (cr_categoryStr[i] == "外汇")
                        cateName = cateWaihui;
                    else if (cr_categoryStr[i] == "石油")
                        cateName = cateYuanyou;
                    else if (cr_categoryStr[i] == "金融")
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
            selector.children('a.ix_gou').each(function(index, el) {
                cArray.push($(el).text());
            });
            return cArray;
        }
        // 每5分钟获取重新获取token
        // setInterval(function() {
        //     $.ajax("/home/index/get_token");
        // }, 1000 * 60 * 5);