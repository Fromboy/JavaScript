/********************************
脚本功能：Pillow： 睡眠周期跟踪器+解锁订阅
下载地址：https://is.gd/X3FiFg
软件版本：4.9
更新时间：2026-9-26
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************
[rewrite_local]

^https:\/\/api\.revenuecat\.com\/v1\/(subscribers|receipts) url script-response-body https://raw.githubusercontent.com/Fromboy/JavaScript/refs/heads/Scripts/PillowRevenueCat.js
[mitm] 
hostname= api.revenuecat.com

********************************/

var obj = {"request_date":"2020-02-15T07:09:49Z",
  "request_date_ms":"1581750589992",
  "subscriber":{
    "entitlements":{
      "premium":{
        "expires_date":"2055-02-22T07:07:58Z",
      "product_identifier":"com.neybox.pillow.premium.year",
      "purchase_date":"2020-02-15T07:07:58Z"}
      },
      "first_seen":"2020-02-14T20:28:01Z",
      "last_seen":"2020-02-14T20:28:01Z",
      "non_subscriptions":{},
      "original_app_user_id":"D1D6D98B-EF51-48AF-9876-7352ABCEFD60",
      "original_application_version":"216",
      "original_purchase_date":"2020-02-14T20:26:59Z",
      "other_purchases":{},
      "subscriptions":{
        "com.neybox.pillow.premium.year":{
          "billing_issues_detected_at":null,
          "expires_date":"2055-02-22T07:07:58Z",
          "is_sandbox":false,
"original_purchase_date":"2020-02-15T07:07:58Z",
          "period_type":"trial",
          "purchase_date":"2020-02-15T07:07:58Z",
          "store":"app_store",
          "unsubscribe_detected_at":null}
          }
      }
 }
$done({body: JSON.stringify(obj)});
