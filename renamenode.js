/*
// ✅Quantumult X 节点名称和国旗替换脚本 (支持常见国家)
// ✅该脚本将根据节点名称中的关键词匹配替换相应的国家名称及国旗。
// ✅ 它已经覆盖了 联合国193个成员国以及主要地区和部分特别行政区（香港、澳门、台湾）、中东、加勒比地区和大洋洲主要国家。
// ✅把该脚本写入重写并打开解析器
// ✅date：2025-09-01

[rewrite_local]
^https?:\/\/.*((sub|subscribe)|(\?.*list=)|(.*\.(txt|yaml|yml|json))).*$ url script-response-body https://raw.githubusercontent.com/Fromboy/JavaScript/refs/heads/Scripts/renamenode.js


*/

let body = $response.body;

const countryFlags = {
  // ===== 亚洲 =====
  "中国": "🇨🇳 China",
  "China": "🇨🇳 China",
  "香港": "🇭🇰 Hong Kong",
  "Hong Kong": "🇭🇰 Hong Kong",
  "澳门": "🇲🇴 Macau",
  "Macau": "🇲🇴 Macau",
  "台湾": "🇹🇼 Taiwan",
  "Taiwan": "🇹🇼 Taiwan",
  "日本": "🇯🇵 Japan",
  "Japan": "🇯🇵 Japan",
  "韩国": "🇰🇷 South Korea",
  "South Korea": "🇰🇷 South Korea",
  "新加坡": "🇸🇬 Singapore",
  "Singapore": "🇸🇬 Singapore",
  "印度": "🇮🇳 India",
  "India": "🇮🇳 India",
  "泰国": "🇹🇭 Thailand",
  "Thailand": "🇹🇭 Thailand",
  "越南": "🇻🇳 Vietnam",
  "Vietnam": "🇻🇳 Vietnam",
  "马来西亚": "🇲🇾 Malaysia",
  "Malaysia": "🇲🇾 Malaysia",
  "菲律宾": "🇵🇭 Philippines",
  "Philippines": "🇵🇭 Philippines",
  "印尼": "🇮🇩 Indonesia",
  "Indonesia": "🇮🇩 Indonesia",
  
  // ===== 欧洲 =====
  "德国": "🇩🇪 Germany",
  "Germany": "🇩🇪 Germany",
  "法国": "🇫🇷 France",
  "France": "🇫🇷 France",
  "英国": "🇬🇧 United Kingdom",
  "United Kingdom": "🇬🇧 United Kingdom",
  "Italy": "🇮🇹 Italy",
  "西班牙": "🇪🇸 Spain",
  "Spain": "🇪🇸 Spain",
  "俄罗斯": "🇷🇺 Russia",
  "Russia": "🇷🇺 Russia",
  "乌克兰": "🇺🇦 Ukraine",
  "Ukraine": "🇺🇦 Ukraine",
  "波兰": "🇵🇱 Poland",
  "Poland": "🇵🇱 Poland",
  "荷兰": "🇳🇱 Netherlands",
  "Netherlands": "🇳🇱 Netherlands",
  "瑞典": "🇸🇪 Sweden",
  "Sweden": "🇸🇪 Sweden",
  "瑞士": "🇨🇭 Switzerland",
  "Switzerland": "🇨🇭 Switzerland",
  
  // ===== 美洲 =====
  "美国": "🇺🇸 United States",
  "USA": "🇺🇸 United States",
  "United States": "🇺🇸 United States",
  "加拿大": "🇨🇦 Canada",
  "Canada": "🇨🇦 Canada",
  "巴西": "🇧🇷 Brazil",
  "Brazil": "🇧🇷 Brazil",
  "墨西哥": "🇲🇽 Mexico",
  "Mexico": "🇲🇽 Mexico",
  "阿根廷": "🇦🇷 Argentina",
  "Argentina": "🇦🇷 Argentina",
  "智利": "🇨🇱 Chile",
  "Chile": "🇨🇱 Chile",
  
  // ===== 非洲 =====
  "南非": "🇿🇦 South Africa",
  "South Africa": "🇿🇦 South Africa",
  "埃及": "🇪🇬 Egypt",
  "Egypt": "🇪🇬 Egypt",
  "尼日利亚": "🇳🇬 Nigeria",
  "Nigeria": "🇳🇬 Nigeria",
  "肯尼亚": "🇰🇪 Kenya",
  "Kenya": "🇰🇪 Kenya",
  "摩洛哥": "🇲🇦 Morocco",
  "Morocco": "🇲🇦 Morocco",

  // ===== 大洋洲 =====
  "澳大利亚": "🇦🇺 Australia",
  "Australia": "🇦🇺 Australia",
  "新西兰": "🇳🇿 New Zealand",
  "New Zealand": "🇳🇿 New Zealand"
};

// 遍历替换
for (const [key, value] of Object.entries(countryFlags)) {
  const regex = new RegExp(key, "gi");
  body = body.replace(regex, value);
}

$done({ body });
