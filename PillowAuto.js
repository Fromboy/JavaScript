/**
 * @description RevenueCat 万能全自动订阅脚本
 * @author Gemini
 * @update 2026-02-21

 *******************************
[rewrite_local]

^https:\/\/api\.revenuecat\.com\/v1\/(subscribers|receipts) url script-response-body https://raw.githubusercontent.com/Fromboy/JavaScript/refs/heads/Scripts/PillowRevenueCat.js
[mitm] 
hostname= api.revenuecat.com

********************************/
 */

if ($response.body) {
  let obj = JSON.parse($response.body);
  const now = new Date();
  const expireDate = "2999-01-01T00:00:00Z";
  const purchaseDate = "2020-02-15T07:07:58Z";

  // 1. 同步服务器请求时间，防止时区或过期校验
  obj.request_date = now.toISOString();
  obj.request_date_ms = now.getTime().toString();

  if (obj.subscriber) {
    // 2. 自动匹配并激活所有权限 (Entitlements)
    if (obj.subscriber.entitlements) {
      Object.keys(obj.subscriber.entitlements).forEach(key => {
        obj.subscriber.entitlements[key] = {
          "expires_date": expireDate,
          "product_identifier": obj.subscriber.entitlements[key].product_identifier || key,
          "purchase_date": purchaseDate
        };
      });
    }

    // 3. 自动匹配并激活所有订阅项 (Subscriptions)
    if (obj.subscriber.subscriptions) {
      Object.keys(obj.subscriber.subscriptions).forEach(key => {
        obj.subscriber.subscriptions[key] = {
          "billing_issues_detected_at": null,
          "expires_date": expireDate,
          "is_sandbox": false,
          "original_purchase_date": purchaseDate,
          "period_type": "trial",
          "purchase_date": purchaseDate,
          "store": "app_store",
          "unsubscribe_detected_at": null
        };
      });
    }
    
    // 4. 重置非订阅项
    obj.subscriber.non_subscriptions = {};
  }

  $done({body: JSON.stringify(obj)});
} else {
  $done({});
}
