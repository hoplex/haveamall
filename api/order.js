var util = require('../utils/util.js');
var app = getApp();

// - -1：订单关闭
// - 0：待支付
// - 1：待发货
// - 2：已发货，待确认
// - 3：待评价

function checkOrder(that, orderId) {

}

function buyGoods(that, goodsId,propertyId,quantity, sucCallback){

  var postData = {
    token: app.globalData.userInfo.token,
    goodsJsonStr: '[{ "goodsId": ' + goodsId + ', "number": ' + quantity+', "propertyChildIds": "' + propertyId+'", "logisticsType": 0 }]',
    provinceId:1,
    cityId:1,
    districtId:1,
    address:"未知地区",
    code:"3100000",
    mobile:"13148453176",
    linkMan:"宋小佳"
  };

  wx.request({
    url: app.globalData.itapiBase + "/order/create",
    method: 'POST',
    data: postData,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      
      if (res.data.code == 0) {
        payOrder(res.data.data.id, res.data.data.amount, sucCallback)
      } else {
        wx.showToast({
          title: 'Oops，' + res.data.msg,
          duration: 800
        });
      }
    },
    fail: function (res) {
      
    }
  })
}

function getOrderDetail(page) {
  var that = page
  var info = app.globalData.userInfo
  wx.request({
    url: app.globalData.itapiBase + "/order/detail",
    data: {
      'token': info.token,
      'id': that.data.orderId
    },
    success: function(res) {
      console.log(res);
    }
  })
}

function payOrder(orderId, amount, sucCallback) {
  var remark = "支付订单 ：" + orderId;
  var nextAction = {
    type: 0,
    id: orderId
  };

  wx.request({
    url: app.globalData.itapiBase + '/pay/wx/wxapp',
    method: 'POST',
    data: {
      token: app.globalData.userInfo.token,
      money: amount,
      remark: remark,
      payName: remark,
      nextAction: JSON.stringify(nextAction)
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      res = res.data

      if (res.code == 0) {
        // 发起支付
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: 'prepay_id=' + res.data.prepayId,
          signType: 'MD5',
          paySign: res.data.sign,
          fail: function (aaa) {
            wx.showToast({
              title: '支付失败:' + aaa
            })
          },
          success: function () {
            // 提示支付成功
            wx.showToast({
              title: '支付成功'
            })
            sucCallback(orderId)
          }
        })
      } else {
        wx.showModal({
          title: '出错了',
          content: res.code + ':' + res.msg + ':' + res.data,
          showCancel: false,
          success: function (res) {

          }
        })
      }
    },
    fail: function (res) {

    }
  })
}

function getMyOrderList(page)
{
  var that = page;

  wx.request({
    url: app.globalData.itapiBase + '/order/list',
    data: {
      token: app.globalData.userInfo.token
    },
    success: function (res) {
      var orderList = res.data.data.orderList;
      var goodsMap = res.data.data.goodsMap;
      var orderParamList = [];

      for(var i =0; i<orderList.length;i++)
      {
        var paramOrder = {};

        paramOrder.orderId = orderList[i].id
        paramOrder.status = orderList[i].status
        paramOrder.orderAmount = orderList[i].amountReal
        paramOrder.merchantName = app.globalData.merchantName;

        var goodsItem = goodsMap[orderList[i].id + ''][0]; 
        paramOrder.orderGoods = []
        var orderGoods = {};
        paramOrder.orderGoods.push(orderGoods)
        orderGoods.logo = goodsItem.pic
        orderGoods.title = goodsItem.goodsName
        orderGoods.price = goodsItem.amount
        orderGoods.retailPrice = goodsItem.amount
        orderGoods.quantity = goodsItem.number

        orderParamList.push(paramOrder);
      }

      that.setData({
        datas: orderParamList,
        loadingHidden: true,
        modalHidden: true,
      });
    },
    fail: function (res) {
      that.setData({
        loadingHidden: true,
        modalHidden: false
      })
    },
    complete: function () {
      wx.stopPullDownRefresh();
    }
  });

}

function getDetailedOrderInfo(page, orderId){
  var that = page;
  that.setData({
    loadingHidden: false,
    modalHidden: true,
  });
  wx.request({
    url: app.globalData.itapiBase + "/order/detail",
    data: {
      id: orderId,
      token: app.globalData.userInfo.token
    },
    success: function (res) {
      var orderInfo = res.data.data.orderInfo;
      var goodsItem = res.data.data.goods[0];
      var paramOrder = {};
      var orderGoods = {};

      paramOrder.orderSn = orderInfo.orderNumber
      paramOrder.orderId = orderInfo.id
      paramOrder.status = orderInfo.status
      paramOrder.orderAmount = orderInfo.amountReal
      paramOrder.orderGoods = []

      paramOrder.orderGoods.push(orderGoods)
      orderGoods.logo = goodsItem.pic
      orderGoods.title = goodsItem.goodsName
      orderGoods.price = goodsItem.amount
      orderGoods.retailPrice = goodsItem.amount
      orderGoods.quantity = goodsItem.number

      var addTime = ''
      var payTime = ''

      for(var idx in res.data.data.logs){
        var log = res.data.data.logs[idx]
        if(log.type == 0){
          addTime = log.dateAdd;
        } else if (log.type == 1){
          payTime = log.dateAdd;
        }
      }


      that.setData({
        datas: paramOrder,
        loadingHidden: true,
        modalHidden: true,
        addTime: addTime,
        payTime: payTime
      });
    },
    fail: function (res) {
      that.setData({
        loadingHidden: true,
        modalHidden: false
      })
    }
  })
}

module.exports = {
  'getOrderDetail': getOrderDetail,
  'buyGoods': buyGoods,
  'getMyOrderList': getMyOrderList,
  'getDetailedOrderInfo': getDetailedOrderInfo
}