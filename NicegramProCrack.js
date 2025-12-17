/***********************************

> 应用名称：Nicegram
> 软件版本：1.5.6
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️


[rewrite_local]
  
# > Nicegram☆解锁会员权限（2024-02-24）
^https?:\/\/nicegram\.cloud\/api\/v\d\/(ai-assistant\/purchase-list|user\/info|telegram\/auth) url script-response-body https://raw.githubusercontent.com/Fromboy/JavaScript/refs/heads/Scripts/NicegramProCrack.js

[mitm] 

hostname=nicegram.cloud

***********************************/


var body=$response.body.replace(/subscription":\w+/g,'subscription":true');
$done({body});
