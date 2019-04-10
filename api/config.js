var app = getApp();

function getBanner (page){
  var that = page
  wx.request({
    url: app.globalData.itapiBase + "/banner/list",
    data: {
    },
    success: function (res) {
      that.setData({
        'banners': res.data.data
      })
    }
  })
}

module.exports = {
  'getBanner': getBanner
}