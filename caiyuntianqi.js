/*
彩云天气
更新2023-09-25
====================================
[rewrite_local]
# 普通版广告
^https:\/\/ad\.cyapi\.cn\/v2\/req\?app_name=weather url reject-dict

^https:\/\/biz\.cyapi\.cn\/v2\/user url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/caiyun.js
^https:\/\/wrapper\.cyapi\.cn\/v1\/(satellite|nafp\/origin_images) url script-request-header https://raw.githubusercontent.com/wf021325/qx/master/js/caiyun.js

[mitm]
hostname = *.cyapi.cn
====================================
 */
var huihui = {},
    url = $request.url;
if (url.includes("/v2/user")) {
    let obj = JSON.parse($response.body);
    obj.result.is_vip = !0,
        obj.result.svip_expired_at = 3742732800,
        obj.result.vip_type = "s",
        huihui.body = JSON.stringify(obj)
}
if (/v1\/(satellite|nafp\/origin_images)/g.test(url)) {
    huihui.headers = $request.headers;
    huihui.headers['device-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNzA1MzMxMTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.h_Cem89QarTXxVX9Z_Wt-Mak6ZHAjAJqgv3hEY6wpps';
}
$done(huihui);
