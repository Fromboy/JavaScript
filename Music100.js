const params = getParams($argument);
const songCount = params.songCount || 5;
const sort = params.sort || 'billboard-hot-100';
const url = `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/${sort}/recent.json`;

$httpClient.get(url, function(error, response, body) {
  if (error) {
    console.log("请求失败:", error);
    $done();
    return;
  }
  handleResponse(body);
});

function handleResponse(body) {
  const data = JSON.parse(body);
  if (data && data.data && data.data.length >= songCount) {
    const songs = data.data.slice(0, songCount);
    const notifications = [];
    for (const song of songs) {
      const { name, artist, rank, last_week_rank } = song;
      let rankChange = '';
      if (last_week_rank !== null) {
        const rankDiff = last_week_rank - rank;
        if (rankDiff >= 0) {
          rankChange = `↑${rankDiff}`;
        } else if (rankDiff < 0) {
          rankChange = `↓${Math.abs(rankDiff)}`;
        }
      } else {
        rankChange = '🆕';
      }
      let notification = `${rank}🎧`;
      if (name !== undefined && name !== null) {
        notification += `${name} - `;
      }
      if (artist !== undefined && artist !== null) {
        notification += `${artist} `;
      }
      notification += rankChange;
      notifications.push(notification);
    }

    const panel = {
      title: `Top ${songCount} of ${sort}`,
      content: notifications.join('\n'),
      songCount: params.songCount,
      sort: params.sort,
      icon: params.icon,
      "icon-color": params.color
    };
    $done(panel);
  } else {
    console.log('无法获取歌曲数据');
    $done();
  }
}

function getParams(param) {
  return Object.fromEntries(
    param
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}