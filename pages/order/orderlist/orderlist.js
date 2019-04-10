// pages/my/orderlist/orderlist.js
var app = getApp()
var orderApi = require('../../../api/order.js');

Page({
  data: {
    datas: {},
    loadingHidden: true,
    modalHidden: true,
  },
  Request: function() {
    var that = this;
    that.setData({
      loadingHidden: false,
      modalHidden: true,
    });
    var userInfo = app.globalData.userInfo;

    orderApi.getMyOrderList(that);
  },

  //上拉加载更多
  onReachBottom: function() {
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.Request();
  },

  orderDetail: function(e) {
    wx.navigateTo({
      url: '/pages/order/orderdetail/orderdetail?orderId=' + e.currentTarget.id,
    })
  },
  orderProcess: function(e) {
    wx.navigateTo({
      url: '/pages/order/ordercheck/ordercheck?orderId=' + e.currentTarget.id,
    })
  },
  onLoad: function(options) {},
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    var that = this;
    that.Request();
  },
  onHide: function() {
  },
  onUnload: function() {
  }
})