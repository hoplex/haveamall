function formatTime(timestamp) {
  var date = new Date();
  date.setTime(timestamp)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  year = formatNumber(year);
  month = formatNumber(month);
  day = formatNumber(day);
  hour = formatNumber(hour);
  minute = formatNumber(minute);
  second = formatNumber(second);
  formatTime

  return {
    "year": year,
    "month": month,
    "day": day,
    "hour": hour,
    "minute": minute,
    "second": second
  }
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function showTime(timestamp) {
  var today = Date.parse(new Date());
  today = formatTime(today);
  var inDay = formatTime(timestamp);

  if (today.year == inDay.year) {
    if (today.month == inDay.month & today.day == inDay.day) {
      return "今日" + inDay.hour + ":" + inDay.minute

    } else if (today.month == inDay.month & today.day+1 == inDay.day) {
      return "明日" + inDay.hour + ":" + inDay.minute

    } else {
      return inDay.month + '月' + inDay.day + '日'

    }
    
  } else {
    return inDay.year + '年' + inDay.month + '月' + inDay.day + '日'
  }
}

function formatTime1(timestamp) {
  var date = new Date();
  date.setTime(timestamp)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  year = formatNumber(year);
  month = formatNumber(month);
  day = formatNumber(day);

  return year + '-' + month + '-' + day;
}

function formatTime2(timestamp) {
  if (timestamp == '' || timestamp <= 0) {
    return 0;
  }

  var date = new Date(timestamp);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

function formatTime3(timestamp) {
  var date = new Date();
  date.setTime(timestamp)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  year = formatNumber(year);
  month = formatNumber(month);
  day = formatNumber(day);

  return year + '年' + month + '月' + day + '日';
}

function formatTime4(timestamp) {
  if (timestamp == '' || timestamp <= 0) {
    return 0;
  }

  var date = new Date(timestamp);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()

  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

function formatTime5(timestamp) {
  if (timestamp == '' || timestamp <= 0) {
    return 0;
  }

  var date = new Date(timestamp);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()

  return year + '/' + month + '/' + day + '  ' + hour + ':' + minute;
}

function formatTime6(timestamp) {
  var date = new Date();
  date.setTime(timestamp)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  return year + '.' + month + '.' + day;
}

function formatTime7(timestamp) {
  if (timestamp == '' || timestamp <= 0) {
    return 0;
  }

  var date = new Date(timestamp);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  if (hour < 10) {
    hour = '0' + hour
  }

  if (minute < 10) {
    minute = '0' + minute
  }

  if (second < 10) {
    second = '0' + second
  }

  return year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + second;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 是否包含 汉字
 */
function checkChineseChar(s) {
  var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  if (patrn.exec(s)) {
    return true;
  }

  return false;
}

/**
 * 是否包含 特殊符号
 */
function checkSpecialChar(s) {
  var special = /[~#^$@%&!*()<>:;'"{}【】  ]/gi;
  if (special.exec(s)) {
    return true;
  }

  return false;
}

/**
 * 是否包含 数字和英文
 */
function checkNumAndEnglish(s) {
  var char = /^[A-Za-z0-9]+$/;
  if (char.exec(s)) {
    return true;
  }

  return false;
}

function formatHiboomTime(hour, minute, second) {
  var time = ''
  if (hour > 0) {
    time = hour + '时' + minute + '分' + second + '秒'
  } else {
    if (minute > 0) {
      time = minute + '分' + second + '秒'
    } else {
      if (second <= 0) {
        time = '--'
      } else {
        time = second + '秒'
      }
    }
  }
  return time
}

module.exports = {
  showTime: showTime,
  formatTime: formatTime,
  formatTime1: formatTime1,
  formatTime2: formatTime2,
  formatTime3: formatTime3,
  formatTime4: formatTime4,
  formatTime5: formatTime5,
  formatTime6: formatTime6,
  formatTime7: formatTime7,
  'checkChineseChar': checkChineseChar,
  'checkSpecialChar': checkSpecialChar,
  'checkNumAndEnglish': checkNumAndEnglish,
  'formatHiboomTime': formatHiboomTime
}