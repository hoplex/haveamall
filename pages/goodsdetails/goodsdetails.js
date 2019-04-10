
var app = getApp();

var orderApi = require('../../api/order.js');
var goodsApi = require('../../api/goods.js');

var ZanWidget = require('../../widget/quantity/quantity.js');

var util = require('../../utils/util.js');

Page(Object.assign({}, ZanWidget.Quantity, {
  data: {
    datas: {},
    loadingHidden: true,
    modalHidden: true,
    goodsId: '',
    quantity1: {
      quantity: 1,
      min: 1,
      max: 20
    },
    totalPrice: '0'
  },
  onLoad: function(options) {
    var that = this;

    this.setData({
      'goodsId': options.goodsId
    });

    goodsApi.getDetailedGoods(that, options.goodsId);

  },
  confirmOrder: function(res) {
    
    var param = {
      orders: [{
        orderGoods: [{
          logo: this.data.datas.data.basicInfo.pic,
          title: this.data.datas.data.basicInfo.name,
          price: this.data.datas.data.basicInfo.minPrice,
          retailPrice: this.data.datas.data.basicInfo.originalPrice,
          quantity: this.data.quantity1.quantity,
          goodsId: this.data.datas.data.basicInfo.id,
          specId: this.data.datas.data.properties[0].id
        }],
        orderId: 0
      }],
      orderAmount: this.data.totalPrice
    }

    wx.navigateTo({
      url: '/pages/order/ordercheck/ordercheck?orderInfo=' + JSON.stringify(param)
    })

    this.toggleDialog()
  },

  toggleDialog: function() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },

  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.setData({
      [`${componentId}.quantity`]: quantity,
    });

    this.statistics();
  },
  statistics: function() {
    this.setData({
      'totalPrice': (this.data.datas.data.basicInfo.minPrice * this.data.quantity1.quantity).toFixed(2)
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
    // 页面关闭
  },
  onShareAppMessage: function(res) {
    return {
      title: this.data.datas.data.title,
      path: '/pages/goodsdetails/goodsdetails?goodsId=' + this.data.goodsId,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
}));