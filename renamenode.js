/*
// ✅Quantumult X 节点名称和国旗替换脚本 (支持常见国家)
// ✅该脚本将根据节点名称中的关键词匹配替换相应的国家名称及国旗。
// ✅ 它已经覆盖了 联合国193个成员国以及主要地区和部分特别行政区（香港、澳门、台湾）、中东、加勒比地区和大洋洲主要国家。
// ✅把该脚本写入重写并打开解析器
// ✅date：2025-09-01

[rewrite_local]
^https?:\/\/.*((sub|subscribe)|(\?.*list=)|(.*\.(txt|yaml|yml|json))).*$ url script-response-body https://raw.githubusercontent.com/Fromboy/JavaScript/refs/heads/Scripts/renamenode.js


*/

// 确保响应是字符串
let body = typeof $response.body === "string" ? $response.body : JSON.stringify($response.body);

const countryFlags = {
  // 亚洲 (Asia)
  "中国|China|CN": "中国 🇨🇳",
  "香港|Hong Kong|HK": "香港 🇭🇰",
  "台湾|Taiwan|TW": "台湾 🇹🇼",
  "日本|Japan|JP": "日本 🇯🇵",
  "韩国|South Korea|Korea|KR": "韩国 🇰🇷",
  "印度|India|IN": "印度 🇮🇳",
  "以色列|Israel|IL": "以色列 🇮🇱",
  "阿联酋|UAE|AE": "阿联酋 🇦🇪",
  "沙特|Saudi Arabia|SA": "沙特 🇸🇦",
  "土耳其|Turkey|TR": "土耳其 🇹🇷",
  "卡塔尔|Qatar|QA": "卡塔尔 🇶🇦",
  "科威特|Kuwait|KW": "科威特 🇰🇼",
  "巴林|Bahrain|BH": "巴林 🇧🇭",
  "约旦|Jordan|JO": "约旦 🇯🇴",
  "越南|Vietnam|VN": "越南 🇻🇳",
  "泰国|Thailand|TH": "泰国 🇹🇭",
  "马来西亚|Malaysia|MY": "马来西亚 🇲🇾",
  "菲律宾|Philippines|PH": "菲律宾 🇵🇭",
  "印尼|Indonesia|ID": "印尼 🇮🇩",
  "阿富汗|Afghanistan|AF": "阿富汗 🇦🇫",
  "孟加拉国|Bangladesh|BD": "孟加拉国 🇧🇩",
  "尼泊尔|Nepal|NP": "尼泊尔 🇳🇵",
  "斯里兰卡|Sri Lanka|LK": "斯里兰卡 🇱🇰",
  "巴基斯坦|Pakistan|PK": "巴基斯坦 🇵🇰",
  "伊拉克|Iraq|IQ": "伊拉克 🇮🇶",
  "伊朗|Iran|IR": "伊朗 🇮🇷",
  "阿曼|Oman|OM": "阿曼 🇴🇲",
  "也门|Yemen|YE": "也门 🇾🇪",
  "格鲁吉亚|Georgia|GE": "格鲁吉亚 🇬🇪",
  "亚美尼亚|Armenia|AM": "亚美尼亚 🇦🇲",
  "哈萨克斯坦|Kazakhstan|KZ": "哈萨克斯坦 🇰🇿",
  "乌兹别克斯坦|Uzbekistan|UZ": "乌兹别克斯坦 🇺🇿",
  "吉尔吉斯斯坦|Kyrgyzstan|KG": "吉尔吉斯斯坦 🇰🇬",
  "塔吉克斯坦|Tajikistan|TJ": "塔吉克斯坦 🇹🇯",
  "老挝|Laos|LA": "老挝 🇱🇦",
  "柬埔寨|Cambodia|KH": "柬埔寨 🇰🇭",
  "缅甸|Myanmar|MM": "缅甸 🇲🇲",
  "蒙古|Mongolia|MN": "蒙古 🇲🇳",
  "文莱|Brunei|BN": "文莱 🇧🇳",
  "北朝鲜|North Korea|KP": "北朝鲜 🇰🇵",
  "巴勒斯坦|Palestine|PS": "巴勒斯坦 🇵🇸",
  "黎巴嫩|Lebanon|LB": "黎巴嫩 🇱🇧",
  "阿塞拜疆|Azerbaijan|AZ": "阿塞拜疆 🇦🇿",
  "马尔代夫|Maldives|MV": "马尔代夫 🇲🇻",
  "叙利亚|Syria|SY": "叙利亚 🇸🇾",

  // 欧洲 (Europe)
  "英国|United Kingdom|UK|England": "英国 🇬🇧",
  "德国|Germany|DE": "德国 🇩🇪",
  "法国|France|FR": "法国 🇫🇷",
  "俄罗斯|Russia|RU": "俄罗斯 🇷🇺",
  "荷兰|Netherlands|NL": "荷兰 🇳🇱",
  "瑞士|Switzerland|CH": "瑞士 🇨🇭",
  "瑞典|Sweden|SE": "瑞典 🇸🇪",
  "挪威|Norway|NO": "挪威 🇳🇴",
  "丹麦|Denmark|DK": "丹麦 🇩🇰",
  "芬兰|Finland|FI": "芬兰 🇫🇮",
  "比利时|Belgium|BE": "比利时 🇧🇪",
  "奥地利|Austria|AT": "奥地利 🇦🇹",
  "爱尔兰|Ireland|IE": "爱尔兰 🇮🇪",
  "葡萄牙|Portugal|PT": "葡萄牙 🇵🇹",
  "希腊|Greece|GR": "希腊 🇬🇷",
  "西班牙|Spain|ES": "西班牙 🇪🇸",
  "意大利|Italy|IT": "意大利 🇮🇹",
  "波兰|Poland|PL": "波兰 🇵🇱",
  "捷克|Czech|CZ": "捷克 🇨🇿",
  "匈牙利|Hungary|HU": "匈牙利 🇭🇺",
  "白俄罗斯|Belarus|BY": "白俄罗斯 🇧🇾",
  "乌克兰|Ukraine|UA": "乌克兰 🇺🇦",

  // 美洲 (America)
  "美国|USA|United States|US": "美国 🇺🇸",
  "加拿大|Canada|CA": "加拿大 🇨🇦",
  "墨西哥|Mexico|MX": "墨西哥 🇲🇽",
  "巴西|Brazil|BR": "巴西 🇧🇷",
  "阿根廷|Argentina|AR": "阿根廷 🇦🇷",
  "智利|Chile|CL": "智利 🇨🇱",
  "哥伦比亚|Colombia|CO": "哥伦比亚 🇨🇴",
  "秘鲁|Peru|PE": "秘鲁 🇵🇪",
  "委内瑞拉|Venezuela|VE": "委内瑞拉 🇻🇪",
  "乌拉圭|Uruguay|UY": "乌拉圭 🇺🇾",

  // 非洲 (Africa)
  "南非|South Africa|ZA": "南非 🇿🇦",
  "埃及|Egypt|EG": "埃及 🇪🇬",
  "尼日利亚|Nigeria|NG": "尼日利亚 🇳🇬",
  "肯尼亚|Kenya|KE": "肯尼亚 🇰🇪",
  "摩洛哥|Morocco|MA": "摩洛哥 🇲🇦",
  "阿尔及利亚|Algeria|DZ": "阿尔及利亚 🇩🇿",
  "突尼斯|Tunisia|TN": "突尼斯 🇹🇳",

  // 大洋洲 (Oceania)
  "澳大利亚|Australia|AU": "澳大利亚 🇦🇺",
  "新西兰|New Zealand|NZ": "新西兰 🇳🇿",
  "斐济|Fiji|FJ": "斐济 🇫🇯",
  "巴布亚新几内亚|Papua New Guinea|PG": "巴布亚新几内亚 🇵🇬"
};

// 遍历替换
for (let pattern in countryFlags) {
  const regex = new RegExp(pattern, "gi");
  body = body.replace(regex, countryFlags[pattern]);
}

$done({body});
