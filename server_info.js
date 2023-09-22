/**
 * 新增时间：2023-09-22 14：00
 * 作用：因内很多软件都显示IP地址，且部分需要住宅IP才能生效（比如音），使用了代理后显示IP未知是代理节点因为机房的IP，所以写个脚本判断当前节点是不是住宅IP
 *
 * 配置：
 * [任务本地]
 * 事件交互 https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/scripts/server_info.js, tag=节点详情查询, img-url=https://raw.githubusercontent.com/blackmatrix7/ ios_rule_script/master/icon/qure/color/Back.png，启用= true
 * 使用：配置好以后按节点执行脚本大致，如果节点类型的ISP进行的判断
 * 由于显示详细ISP的网站需要付费（ipinfo.io），所以只能找个替代的网站（www.cz88.net)
 *
 * http://ip-api.com/json?lang=zh-CN 返回结果：
 * {
 *“状态”：“成功”，
 *“国家”：“新加坡”，
 *“国家代码”：“SG”，
 *“区域”：“01”，
 * "regionName": "新加坡中部",
 *“城市”：“新加坡”，
 *“邮编”：“048582”，
 *“纬度”：1.28009，
 *“长”：103.851，
 *“时区”：“亚洲/新加坡”，
 *“isp”：“亚马逊技术公司”，
 * "org": "AWS EC2 (ap-southeast-1)",
 *“as”：“AS16509 Amazon.com, Inc.”，
 *“查询”：“13.251.43.8”
 * }
 **/

让消息=“”；
get_ip_api();

// 1、先获取当前节点的IP，如果能从$环境中取到，可以省略这一步
函数 get_ip_api() {
  const url = `http://ip-api.com/json?lang=zh-CN`;
  常量选项 = {
    策略：$environment.params
  };
  常量 myRequest = {
    网址： 网址，
    选择： 选择，
    超时：8000
  };

  $task.fetch(myRequest).then(响应 => {
    console.log(response.statusCode + "--ip-api--\n" + response.body);
    if (response.body) fetchIPInfo(response.body);
  }, () => {
    message = "</br></br>🛑查询超时";
    消息 = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">` + message + `</p>`;
    $done({"title": " 📍 节点详情查询", "htmlMessage": message});
  })
}

// 2、获取到IP后再去查询IP的详细信息
函数 fetchIPInfo(数据) {
  const url = `https://www.cz88.net/api/cz88/ip/base?ip=${JSON.parse(data).query}`;
  console.log("url=" + url);
  常量 myRequest = {
    网址： 网址，
    超时：8000
  };

  $task.fetch(myRequest).then(响应 => {
    console.log(response.statusCode + "--cz88--\n" + response.body);
    if (response.body) json2info(response.body, data);
    $done({"title": " 📍 节点详情查询", "htmlMessage": message});
  }，原因=> {
    console.log(原因.错误);
    $完成();
  });
}

// 3、解析数据
函数 json2info(data1, 数据) {
  console.log("开始解析数据、、、\n");
  data1 = JSON.parse(data1).data;
  数据 = JSON.parse(数据);
  console.log("结束解析数据，开始构建内容、、、\n");

  消息=“------------------------------”；
  // 组成每一行内容
  message += "</br><b>IP：</b>" + data1.ip + "</br>";
  message += "</br><b>运营商(isp)：</b>" + data1.isp + "</br>";
  message += "</br><b>网络类型：</b>" + data1.netWorkType + "</br>";
  message += "</br><b>真人概率：</b>" + data1.score + "</br>";
  message += "</br><b>位置：</b>" + data1.countryCode + "-" + data1.country + "-" + data1.province + "-" + data1.city + "-" + data1.districts + "</br>";
  message += "</br><b>ZIP：</b>" + data.zip + "</br>";
  message += "</br><b>经纬度:</b>" + data.lon + " / " + data.lat + "</br>";
  message += "</br><b>时区: </b>" + data.timezone + "</br>";
  消息+=“------------------------------”+“</br>”
  message += "<font color=#6959CD><b>节点</b> ➟ " + $environment.params + "</font>";
  消息 = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: lighter">` + message + `</p>`;
  console.log("\n" + 消息);
}
