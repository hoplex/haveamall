// pages/my/orderlist/orderlist.js
var app = getApp()
var orderApi = require('../../../api/order.js');

Page({
  data: {
    datas: [],
    pageIdx: 1,
    loadingHidden: true,
    modalHidden: true,
  },
  Request: function() {
    var that = this;
    that.setData({
      loadingHidden: false,
      modalHidden: true,
    });
    orderApi.getMyOrderList(that);
  },

  //上拉加载更多
  onReachBottom: function() {
    this.setData({
      pageIdx: this.data.pageIdx + 1
    });
    this.Request();
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      pageIdx: 1,
      datas: []
    });
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