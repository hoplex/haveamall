var app = getApp();
var WxParse = require('../widget/wxParse/wxParse.js');
var util = require('../utils/util.js');

function getDetailedGoods(page, orderId){
  var that = page

  that.setData({
    loadingHidden: false,
    modalHidden: true,
  });

  wx.request({
    url: app.globalData.itapiBase + "/shop/goods/detail",
    data: {
      id: orderId,
    },
    success: function (res) {
      var spec = res.data.data.properties[0]
      var buyLimit = 10
      displayValidityEnd(res);
      var isPackageShow = false

      WxParse.wxParse('article', 'html', res.data.data.content, that, 5);

      that.setData({
        datas: res.data,
        loadingHidden: true,
        modalHidden: true,
        quantity1: {
          quantity: 1,
          min: 1,
          max: buyLimit
        }
      });
      that.statistics();

      //设置页面title
      wx.setNavigationBarTitle({
        title: res.data.data.title
      })
    },
    fail: function (res) {
      that.setData({
        loadingHidden: true,
        modalHidden: false
      })
    }
  })

}

function getCategory(page) {
  wx.request({
    url: app.globalData.itapiBase + "/shop/goods/category/all",
    data: {},
    success: function (res) {
      var tags = [{
        id : -1,
        type: '所有',
        name: '所有'
      }]
      
      tags = tags.concat(res.data.data)

      if (tags.length > 0) {
        tags[0].check = true
      }
      page.setData({
        'tags': tags
      })
    }
  })
}

function GetGoodsList(fromPage) {
  var that    = fromPage
  var tagId   = that.data.tagId
  var pageIdx = that.data.pageIdx

  var paramMap = {
    page: pageIdx,
    pageSize: app.globalData.pageSize
  };

  if(tagId>0){
    paramMap.categoryId = tagId;
  }

  wx.request({
    url: app.globalData.itapiBase + "/shop/goods/list",
    data: paramMap,
    success: function(res) {
      var retArr = [];
      
      if (res.data.code == 0) {
        retArr = getProcessRetArr(res.data.data)
      } else if (res.data.code == 700) {
        //没有加载到更多数据，修正下当前页
        pageIdx = pageIdx > 1 ? pageIdx - 1 : pageIdx
        that.data.pageIdx = pageIdx
      }

      var catArr = that.data.retArr.concat(retArr);

      that.setData({
        retArr : catArr
      })
    }
  })
}

/**
 * 处理 list
 */
function getProcessRetArr(retArr) {
  for (var index in retArr) {
    var item = retArr[index]
    item.priceFloat = parseFloat(item.minPrice)
    item.retailPriceFloat = parseFloat(item.originalPrice)
    item.tagType = item.characteristic
    item.title = item.name
    item.merchantName = app.globalData.merchantName
    if (item.recommendStatus==1){
      item.tagTime = '推荐'
    }
    if(item.status==0){
      item.mStatusName = '马上抢'
    } else {
      item.mStatusName = '已抢完'
    }
  
  }

  return retArr;
}

// 判断截至日期是否为当天，当天显示时间
function displayValidityEnd(res) {
  var today = Date.parse(new Date());
  today = util.formatTime(today);
  var validityStart = util.formatTime(res.data.data.validityStart * 1000);
  var validityEnd = util.formatTime(res.data.data.validityEnd * 1000);

  if (today.year == validityEnd.year & today.month == validityEnd.month & today.day == validityEnd.day) {
    res.data.data.showTime = "今天" + validityEnd.hour + "时" + validityEnd.minute + "分"
  } else {
    var start = validityStart.year + '年' + validityStart.month + '月' + validityStart.day + '日'
    var end = validityEnd.year + '年' + validityEnd.month + '月' + validityEnd.day + '日'
    res.data.data.showTime = start + ' - ' + end
  }
  return res;
}

module.exports = {
  'GetGoodsList': GetGoodsList,
  'getCategory': getCategory,
  'getDetailedGoods': getDetailedGoods
}