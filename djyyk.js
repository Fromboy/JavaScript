/*
 *
 *
脚本功能：dj音乐库-dj电音音乐播放器  VIP
软件版本：2.6.7
下载地址：
脚本作者：
更新时间：2025年8月12
电报频道：
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >dj音乐库-dj电音音乐播放器 VIP
^http:\/\/app-i.dj-5.com\/api\/User\/Info url script-response-body https://raw.githubusercontent.com/Fromboy/JavaScript/refs/heads/Scripts/djyyk.js

[mitm]
hostname = app-i.dj-5.com
*
*
*/






















































































































var body = $response.body;
let obj = JSON.parse($response.body);
obj.result.nickname = "no see you";
obj.result.cover = "/usercovers/e9ac8cec71e04feeb0d6297bdea58a09.jpg"
obj.result.isvip = true;
obj.result.expiretime = 32493834549;
$done({
    body:  JSON.stringify(obj)
});

