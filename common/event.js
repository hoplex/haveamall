var app = getApp();

function event(clickItem) {
  if (clickItem == null || clickItem.type == null || clickItem.businessId == null) {
    return;
  }

  var subjectId = clickItem.businessId
  var subjectType = clickItem.type

  switch (subjectType) {
    case 'goods':
      navigateTo('../goodsdetails/goodsdetails?cgoodsId=' + subjectId)
      break;
    case 'toast':
      wx.showToast({
        title: '' + subjectMessage,
        icon: 'none'
      })
      break;
    default:
      wx.showToast({
        title: '该功能暂未开放',
        icon: 'none'
      })
      break;
  }
}

function navigateTo(url, isLogin) {
  if (url == null || url.length <= 0) {
    return;
  }

  wx.navigateTo({
    url: url,
  })
}

module.exports = {
  event: event
}