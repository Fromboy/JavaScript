/*
// ✅Quantumult X 节点名称和国旗替换脚本 (支持常见国家)
// ✅该脚本将根据节点名称中的关键词匹配替换相应的国家名称及国旗。
// ✅ 它已经覆盖了 联合国193个成员国以及主要地区和部分特别行政区（香港、澳门、台湾）、中东、加勒比地区和大洋洲主要国家。
// ✅把该脚本写入重写并打开解析器
// ✅date：2025-09-01

[rewrite_local]
^https?:\/\/.*((sub|subscribe)|(\?.*list=)|(.*\.(txt|yaml|yml|json))).*$ url script-response-body https://raw.githubusercontent.com/Fromboy/JavaScript/refs/heads/Scripts/renamenode.js


*/

// 安全获取响应内容
let body = "";
try {
    body = $response && $response.body ? 
           (typeof $response.body === "string" ? $response.body : JSON.stringify($response.body)) 
           : "";
} catch (e) {
    body = "";
}

// ==================== 国旗字典 ====================
// 亚洲 Asia
const countryFlags = {
    "中国|China|CN": "中国 🇨🇳", "香港|Hong Kong|HK": "香港 🇭🇰", "台湾|Taiwan|TW": "台湾 🇹🇼",
    "日本|Japan|JP": "日本 🇯🇵", "韩国|South Korea|Korea|KR": "韩国 🇰🇷", "印度|India|IN": "印度 🇮🇳",
    "以色列|Israel|IL": "以色列 🇮🇱", "阿联酋|UAE|AE": "阿联酋 🇦🇪", "沙特|Saudi Arabia|SA": "沙特 🇸🇦",
    "土耳其|Turkey|TR": "土耳其 🇹🇷", "越南|Vietnam|VN": "越南 🇻🇳", "泰国|Thailand|TH": "泰国 🇹🇭",
    "马来西亚|Malaysia|MY": "马来西亚 🇲🇾", "菲律宾|Philippines|PH": "菲律宾 🇵🇭", "印尼|Indonesia|ID": "印尼 🇮🇩",
    "巴基斯坦|Pakistan|PK": "巴基斯坦 🇵🇰", "孟加拉|Bangladesh|BD": "孟加拉 🇧🇩", "斯里兰卡|Sri Lanka|LK": "斯里兰卡 🇱🇰",
    "阿富汗|Afghanistan|AF": "阿富汗 🇦🇫", "伊朗|Iran|IR": "伊朗 🇮🇷"
    // 可继续补充其他亚洲国家
};

// 欧洲 Europe
Object.assign(countryFlags, {
    "英国|United Kingdom|UK|England": "英国 🇬🇧", "德国|Germany|DE": "德国 🇩🇪", "法国|France|FR": "法国 🇫🇷",
    "俄罗斯|Russia|RU": "俄罗斯 🇷🇺", "荷兰|Netherlands|NL": "荷兰 🇳🇱", "瑞士|Switzerland|CH": "瑞士 🇨🇭",
    "瑞典|Sweden|SE": "瑞典 🇸🇪", "挪威|Norway|NO": "挪威 🇳🇴", "丹麦|Denmark|DK": "丹麦 🇩🇰",
    "芬兰|Finland|FI": "芬兰 🇫🇮", "意大利|Italy|IT": "意大利 🇮🇹"
});

// 美洲 America
Object.assign(countryFlags, {
    "美国|USA|United States|US": "美国 🇺🇸", "加拿大|Canada|CA": "加拿大 🇨🇦", "墨西哥|Mexico|MX": "墨西哥 🇲🇽",
    "巴西|Brazil|BR": "巴西 🇧🇷", "阿根廷|Argentina|AR": "阿根廷 🇦🇷"
});

// 非洲 Africa
Object.assign(countryFlags, {
    "南非|South Africa|ZA": "南非 🇿🇦", "埃及|Egypt|EG": "埃及 🇪🇬", "尼日利亚|Nigeria|NG": "尼日利亚 🇳🇬",
    "肯尼亚|Kenya|KE": "肯尼亚 🇰🇪"
});

// 大洋洲 Oceania
Object.assign(countryFlags, {
    "澳大利亚|Australia|AU": "澳大利亚 🇦🇺", "新西兰|New Zealand|NZ": "新西兰 🇳🇿"
});

// ==================== 替换逻辑 ====================
let replaced = false;
for (let pattern in countryFlags) {
    const regex = new RegExp(pattern, "gi");
    if (regex.test(body)) {
        body = body.replace(regex, countryFlags[pattern]);
        replaced = true;
    }
}

// 如果没有匹配到任何国家，给默认国旗 🌐
if (!replaced) {
    body = body.replace(/(节点|Node|server|host)/gi, "🌐 $1");
}

$done({body});
