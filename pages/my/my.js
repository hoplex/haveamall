// pages/my/my.js

var app = getApp()
Page({
  data: {
    nickname: ''
  },
  //事件处理函数
  onLoad: function(options) {
    this.initData()
  },

  initData: function() {
    var openid = app.globalData.userInfo.openid;

    this.setData({
      nickname: openid.slice(2,8)
    });
  },


  getUserInfo: function(res) {

  },

  toOrderList: function(res) {
    wx.navigateTo({
      url: '/pages/order/orderlist/orderlist',
    })
  },

  onShow: function() {
    this.initData()
  }
})