
var app = getApp();

var orderApi = require('./../../../api/order.js');

Page({
  data: {
    orderId: ''
  },
  onLoad: function(options) {
    var that = this
    that.setData({
      'orderId': options.orderId
    })

    setTimeout(function() {
      orderApi.getOrderDetail(that)
    }, 800)
  },

  onClickCheck: function(e) {
    var that = this
    
  },

})