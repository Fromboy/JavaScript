/*
Pillow RevenueCat 解锁脚本
*/

let obj = {
  request_date: "2025-09-05T12:00:00Z",
  request_date_ms: 1757073600000,
  subscriber: {
    entitlements: {
      premium: {
        product_identifier: "com.neybox.pillow.premium.year",
        purchase_date: "2023-01-01T00:00:00Z",
        expires_date: "2099-01-01T00:00:00Z"
      }
    },
    first_seen: "2023-01-01T00:00:00Z",
    last_seen: "2025-09-05T12:00:00Z",
    original_app_user_id: "00000000-0000-0000-0000-000000000000",
    original_application_version: "216",
    original_purchase_date: "2023-01-01T00:00:00Z",
    subscriptions: {
      "com.neybox.pillow.premium.year": {
        billing_issues_detected_at: null,
        expires_date: "2099-01-01T00:00:00Z",
        is_sandbox: false,
        original_purchase_date: "2023-01-01T00:00:00Z",
        period_type: "active",
        purchase_date: "2023-01-01T00:00:00Z",
        store: "app_store",
        unsubscribe_detected_at: null
      }
    }
  }
};

$done({ body: JSON.stringify(obj) });
