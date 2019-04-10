
var clickUtil = require('../../../utils/clickUtil.js');
var orderApi = require('../../../api/order.js');

var app = getApp()

Page({
  data: {
    datas: {},
    loadingHidden: true,
    modalHidden: true
  },
  onLoad: function(options) {
    var that = this;
    let data = JSON.parse(decodeURIComponent(options.orderInfo));

    that.setData({
      datas: data
    });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
  },
  // 下订单+支付
  submit: function() {

    var orderInfo = this.data.datas.orders[0].orderGoods[0]

    orderApi.buyGoods(
      this, 
      orderInfo.goodsId, 
      orderInfo.specId, 
      orderInfo.quantity, 
      function(orderId){
        wx.redirectTo({
          url: '/pages/order/orderresult/orderresult?orderId=' + orderId
        })
      })
  }
})