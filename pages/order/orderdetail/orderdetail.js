var app = getApp();

var orderApi = require('../../../api/order.js')

var util = require('../../../utils/util.js');
var clickUtil = require('../../../utils/clickUtil.js');


Page({
  data: {
    datas: {},
    loadingHidden: true,
    modalHidden: true,
    addTime: '',
    payTime: '',
    orderId: ''
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    if (options.orderId != null) {
      orderApi.getDetailedOrderInfo(that, options.orderId)
      this.setData({
        'orderId': options.orderId
      });
    }
  },
  // 支付
  submit: function() {
    var _this = this;
    clickUtil.setButtonClicked(_this, true)
    //唤起支付
  },
})