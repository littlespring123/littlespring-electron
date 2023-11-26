// 计算上次更新距离现在多久
export const formatTime = (date) => {
  const targetDate = dayjs(date);
  const timeObj = {
    years: dayjs().diff(targetDate, 'years'),
    months: dayjs().diff(targetDate, 'months'),
    days: dayjs().diff(targetDate, 'days'),
    hours: dayjs().diff(targetDate, 'hours'),
    minutes: dayjs().diff(targetDate, 'minutes'),
    seconds: dayjs().diff(targetDate, 'seconds')
  };

  let semantic = '';
  switch (true) {
    // 以前
    case timeObj.years > 0:
      semantic = `${Math.abs(timeObj.years)}年前`;
      break;
    case timeObj.months > 0:
      semantic = `${Math.abs(timeObj.months)}月前`;
      break;
    case timeObj.days > 0:
      semantic = `${Math.abs(timeObj.days)}天前`;
      break;
    case timeObj.hours > 0:
      semantic = `${Math.abs(timeObj.hours)}小时前`;
      break;
    case timeObj.minutes > 0:
      semantic = `${Math.abs(timeObj.minutes)}分钟前`;
      break;
    case timeObj.seconds > 0:
      semantic = `${Math.abs(timeObj.seconds)}秒前`;
      break;
    default:
      semantic = '';
      break;
  }
  return semantic;
};