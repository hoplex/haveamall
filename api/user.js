


function QuickReg(page) {
  var that = page;
  wx.login({
    success: res => {
      wx.request({
        url: that.globalData.itapiBase + '/user/wxapp/register/simple',
        method: 'GET',
        data: {
          code: res.code,
          type: 2
        },
        success: function (res) {
          QuickLogin(page);
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
  })

}

function QuickLogin(page) {
  var that = page;
  wx.login({
    success: res => {
      wx.request({
        url: that.globalData.itapiBase + '/user/wxapp/login',
        method: 'GET',
        data: {
          code: res.code,
          type: 2
        },
        success: function (res) {
          var userInfo = {};
          userInfo.uid = res.data.data.uid;
          userInfo.openid = res.data.data.openid;
          userInfo.token = res.data.data.token;
          page.globalData.userInfo = userInfo;
          wx.setStorageSync('userInfo', userInfo);
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: JSON.stringify(res)
          });
        },
        complete: function (res) {
          // complete
        }
      })
    }
  })

}

function Login (page) {
  QuickReg(page);
}

module.exports = {
  'Login': Login,
}