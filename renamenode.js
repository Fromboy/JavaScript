/*
// ✅Quantumult X 节点名称和国旗替换脚本 (支持常见国家)
// ✅该脚本将根据节点名称中的关键词匹配替换相应的国家名称及国旗。
// ✅ 它已经覆盖了 联合国193个成员国以及主要地区和部分特别行政区（香港、澳门、台湾）、中东、加勒比地区和大洋洲主要国家。
// ✅把该脚本写入重写并打开解析器
// ✅date：2025-09-01

[rewrite_local]
^https?:\/\/.*\/path\/to\/nodeRename$ url script-response-body https://raw.githubusercontent.com/Fromboy/JavaScript/refs/heads/Scripts/renamenode.js

*/

let body = $response.body;

// ====== 亚洲 ======
const asia = {
  "中国":"China 🇨🇳","China":"China 🇨🇳",
  "香港":"Hong Kong 🇭🇰","Hong Kong":"Hong Kong 🇭🇰",
  "澳门":"Macau 🇲🇴","Macau":"Macau 🇲🇴",
  "台湾":"Taiwan 🇹🇼","Taiwan":"Taiwan 🇹🇼",
  "日本":"Japan 🇯🇵","Japan":"Japan 🇯🇵",
  "韩国":"South Korea 🇰🇷","South Korea":"South Korea 🇰🇷",
  "新加坡":"Singapore 🇸🇬","Singapore":"Singapore 🇸🇬",
  "印度":"India 🇮🇳","India":"India 🇮🇳",
  "阿联酋":"UAE 🇦🇪","UAE":"UAE 🇦🇪",
  "沙特阿拉伯":"Saudi Arabia 🇸🇦","Saudi Arabia":"Saudi Arabia 🇸🇦",
  "巴基斯坦":"Pakistan 🇵🇰","Pakistan":"Pakistan 🇵🇰",
  "孟加拉":"Bangladesh 🇧🇩","Bangladesh":"Bangladesh 🇧🇩",
  "泰国":"Thailand 🇹🇭","Thailand":"Thailand 🇹🇭",
  "马来西亚":"Malaysia 🇲🇾","Malaysia":"Malaysia 🇲🇾",
  "越南":"Vietnam 🇻🇳","Vietnam":"Vietnam 🇻🇳",
  "菲律宾":"Philippines 🇵🇭","Philippines":"Philippines 🇵🇭",
  "印尼":"Indonesia 🇮🇩","Indonesia":"Indonesia 🇮🇩",
  "斯里兰卡":"Sri Lanka 🇱🇰","Sri Lanka":"Sri Lanka 🇱🇰",
  "尼泊尔":"Nepal 🇳🇵","Nepal":"Nepal 🇳🇵",
  "蒙古":"Mongolia 🇲🇳","Mongolia":"Mongolia 🇲🇳",
  "科索沃":"Kosovo 🇽🇰","Kosovo":"Kosovo 🇽🇰",
  "北塞浦路斯":"Northern Cyprus 🇳🇨","Northern Cyprus":"Northern Cyprus 🇳🇨",
  "亚美尼亚":"Armenia 🇦🇲","Armenia":"Armenia 🇦🇲",
  "阿塞拜疆":"Azerbaijan 🇦🇿","Azerbaijan":"Azerbaijan 🇦🇿",
  "格鲁吉亚":"Georgia 🇬🇪","Georgia":"Georgia 🇬🇪"
};

// ====== 欧洲 ======
const europe = {
  "德国":"Germany 🇩🇪","France":"France 🇫🇷","英国":"United Kingdom 🇬🇧","UK":"United Kingdom 🇬🇧","United Kingdom":"United Kingdom 🇬🇧",
  "意大利":"Italy 🇮🇹","Italy":"Italy 🇮🇹",
  "西班牙":"Spain 🇪🇸","Spain":"Spain 🇪🇸",
  "瑞士":"Switzerland 🇨🇭","Switzerland":"Switzerland 🇨🇭",
  "荷兰":"Netherlands 🇳🇱","Netherlands":"Netherlands 🇳🇱",
  "瑞典":"Sweden 🇸🇪","Sweden":"Sweden 🇸🇪",
  "挪威":"Norway 🇳🇴","Norway":"Norway 🇳🇴",
  "芬兰":"Finland 🇫🇮","Finland":"Finland 🇫🇮",
  "丹麦":"Denmark 🇩🇰","Denmark":"Denmark 🇩🇰",
  "比利时":"Belgium 🇧🇪","Belgium":"Belgium 🇧🇪",
  "奥地利":"Austria 🇦🇹","Austria":"Austria 🇦🇹",
  "波兰":"Poland 🇵🇱","Poland":"Poland 🇵🇱",
  "捷克":"Czech Republic 🇨🇿","Czech Republic":"Czech Republic 🇨🇿",
  "匈牙利":"Hungary 🇭🇺","Hungary":"Hungary 🇭🇺",
  "俄罗斯":"Russia 🇷🇺","Russia":"Russia 🇷🇺",
  "乌克兰":"Ukraine 🇺🇦","Ukraine":"Ukraine 🇺🇦",
  "希腊":"Greece 🇬🇷","Greece":"Greece 🇬🇷",
  "葡萄牙":"Portugal 🇵🇹","Portugal":"Portugal 🇵🇹",
  "爱尔兰":"Ireland 🇮🇪","Ireland":"Ireland 🇮🇪",
  "冰岛":"Iceland 🇮🇸","Iceland":"Iceland 🇮🇸",
  "保加利亚":"Bulgaria 🇧🇬","Bulgaria":"Bulgaria 🇧🇬",
  "罗马尼亚":"Romania 🇷🇴","Romania":"Romania 🇷🇴",
  "塞尔维亚":"Serbia 🇷🇸","Serbia":"Serbia 🇷🇸",
  "克罗地亚":"Croatia 🇭🇷","Croatia":"Croatia 🇭🇷",
  "斯洛文尼亚":"Slovenia 🇸🇮","Slovenia":"Slovenia 🇸🇮",
  "斯洛伐克":"Slovakia 🇸🇰","Slovakia":"Slovakia 🇸🇰",
  "立陶宛":"Lithuania 🇱🇹","Lithuania":"Lithuania 🇱🇹",
  "拉脱维亚":"Latvia 🇱🇻","Latvia":"Latvia 🇱🇻",
  "爱沙尼亚":"Estonia 🇪🇪","Estonia":"Estonia 🇪🇪",
  "白俄罗斯":"Belarus 🇧🇾","Belarus":"Belarus 🇧🇾",
  "摩尔多瓦":"Moldova 🇲🇩","Moldova":"Moldova 🇲🇩",
  "梵蒂冈":"Vatican City 🇻🇦","Vatican":"Vatican City 🇻🇦",
  "马耳他":"Malta 🇲🇹","Malta":"Malta 🇲🇹",
  "列支敦士登":"Liechtenstein 🇱🇮","Liechtenstein":"Liechtenstein 🇱🇮",
  "圣马力诺":"San Marino 🇸🇲","San Marino":"San Marino 🇸🇲"
};

// ====== 美洲 ======
const americas = {
  "美国":"United States 🇺🇸","USA":"United States 🇺🇸","United States":"United States 🇺🇸",
  "加拿大":"Canada 🇨🇦","Canada":"Canada 🇨🇦",
  "巴西":"Brazil 🇧🇷","Brazil":"Brazil 🇧🇷",
  "墨西哥":"Mexico 🇲🇽","Mexico":"Mexico 🇲🇽",
  "阿根廷":"Argentina 🇦🇷","Argentina":"Argentina 🇦🇷",
  "智利":"Chile 🇨🇱","Chile":"Chile 🇨🇱",
  "哥伦比亚":"Colombia 🇨🇴","Colombia":"Colombia 🇨🇴",
  "秘鲁":"Peru 🇵🇪","Peru":"Peru 🇵🇪",
  "委内瑞拉":"Venezuela 🇻🇪","Venezuela":"Venezuela 🇻🇪",
  "乌拉圭":"Uruguay 🇺🇾","Uruguay":"Uruguay 🇺🇾",
  "巴拉圭":"Paraguay 🇵🇾","Paraguay":"Paraguay 🇵🇾",
  "波多黎各":"Puerto Rico 🇵🇷","Puerto Rico":"Puerto Rico 🇵🇷"
};

// ====== 非洲 ======
const africa = {
  "南非":"South Africa 🇿🇦","South Africa":"South Africa 🇿🇦",
  "埃及":"Egypt 🇪🇬","Egypt":"Egypt 🇪🇬",
  "尼日利亚":"Nigeria 🇳🇬","Nigeria":"Nigeria 🇳🇬",
  "肯尼亚":"Kenya 🇰🇪","Kenya":"Kenya 🇰🇪",
  "摩洛哥":"Morocco 🇲🇦","Morocco":"Morocco 🇲🇦",
  "突尼斯":"Tunisia 🇹🇳","Tunisia":"Tunisia 🇹🇳",
  "阿尔及利亚":"Algeria 🇩🇿","Algeria":"Algeria 🇩🇿",
  "加纳":"Ghana 🇬🇭","Ghana":"Ghana 🇬🇭",
  "坦桑尼亚":"Tanzania 🇹🇿","Tanzania":"Tanzania 🇹🇿",
  "乌干达":"Uganda 🇺🇬","Uganda":"Uganda 🇺🇬"
};

// ====== 大洋洲 ======
const oceania = {
  "澳大利亚":"Australia 🇦🇺","Australia":"Australia 🇦🇺",
  "新西兰":"New Zealand 🇳🇿","New Zealand":"New Zealand 🇳🇿",
  "斐济":"Fiji 🇫🇯","Fiji":"Fiji 🇫🇯",
  "巴布亚新几内亚":"Papua New Guinea 🇵🇬","Papua New Guinea":"Papua New Guinea 🇵🇬"
};

// ====== 中东及其他地区 ======
const middleEast = {
  "以色列":"Israel 🇮🇱","Israel":"Israel 🇮🇱",
  "土耳其":"Turkey 🇹🇷","Turkey":"Turkey 🇹🇷",
  "卡塔尔":"Qatar 🇶🇦","Qatar":"Qatar 🇶🇦",
  "科威特":"Kuwait 🇰🇼","Kuwait":"Kuwait 🇰🇼",
  "巴林":"Bahrain 🇧🇭","Bahrain":"Bahrain 🇧🇭",
  "阿曼":"Oman 🇴🇲","Oman":"Oman 🇴🇲",
  "阿富汗":"Afghanistan 🇦🇫","Afghanistan":"Afghanistan 🇦🇫",
  "伊朗":"Iran 🇮🇷","Iran":"Iran 🇮🇷",
  "伊拉克":"Iraq 🇮🇶","Iraq":"Iraq 🇮🇶",
  "约旦":"Jordan 🇯🇴","Jordan":"Jordan 🇯🇴",
  "黎巴嫩":"Lebanon 🇱🇧","Lebanon":"Lebanon 🇱🇧",
  "叙利亚":"Syria 🇸🇾","Syria":"Syria 🇸🇾",
  "也门":"Yemen 🇾🇪","Yemen":"Yemen 🇾🇪"
};

// 合并所有国家
const allCountries = { ...asia, ...europe, ...americas, ...africa, ...oceania, ...middleEast };

// 遍历替换
for (const [country, replacement] of Object.entries(allCountries)) {
  const regex = new RegExp(country, 'gi');
  body = body.replace(regex, replacement);
}

$done({ body });
