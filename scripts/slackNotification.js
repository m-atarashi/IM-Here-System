"use strict";

// 帰宅時メッセージを返します。なお、滞在時間が１時間未満の場合、時は表示せず分のみ表示します
const gohomeMessage = (stayTimeMillisec) => {
  const [hour, minute] = [
    stayTimeMillisec / 3600000,
    (stayTimeMillisec / 60000) % 60,
  ].map(Math.floor);
  return (
    "今日の学内滞在時間は" +
    (hour > 0 ? `${hour}時間` : "") +
    `${minute}分でした。`
  );
};

// 渡されるたDateオブジェクトをもとに、hh:mmまたはh:mmの形式で時刻を返します
const timeToString = (date) =>
  date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0");

// 滞在時間を含む移動時メッセージを返します
function movedMessage(member, prevLoc, currentLoc, StayTimeManager) {
  if (prevLoc === "自宅") return `${member}が${currentLoc}にあらわれた！`;
  else if (currentLoc === "自宅")
    return (
      `${member}さん今日もお疲れさまでした。` +
      gohomeMessage(member, StayTimeManager.stayTimeMillisec)
    );

  const now = timeToString(new Date());
  const before =
    prevLoc + `（${timeToString(StayTimeManager.lastMovedTime)}～${now}）`;
  const after = currentLoc + `（${now}～）`;
  return `${member} : ${before}─> ${after}`;
}

// 移動時にSlackにメッセージを送ります
async function notifyLocation(
  webhook,
  member,
  prevLoc,
  currentLoc,
  StayTimeManager
) {
  if (typeof webhook === "undefined") return;
  const message = movedMessage(member, prevLoc, currentLoc, StayTimeManager);

  await webhook.send({
    text: message,
  });
}

// 授業参加・退出時にSlackにメッセージを送ります
async function notifyInClassTurned(webhook, member, location, isClass) {
  if (typeof webhook === "undefined") return;
  const message =
    member +
    (isClass ? "さんが講義に参加しました : " : "さん講義お疲れさまでした : ") +
    location;

  await webhook.send({
    text: message,
  });
}

module.exports = {
  notifyLocation: notifyLocation,
  notifyInClassTurned: notifyInClassTurned,
};
