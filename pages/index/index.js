var goodsApi = require('./../../api/goods.js');
var configApi = require('../../api/config.js')

var goodsWidget = require('./../../widget/goods-item/goods-item.js');
var tagsWidget = require('./../../widget/tags/tags.js');

var event = require('./../../common/event.js');

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: Object.assign({
    fixTop: 0,
    swiperAutoplay: true,
    currentSwiper: 0,
    tagId: -1,
    tags: [],
    pageIdx: 1,
    banners: [],
    retArr: []
    }, 
    goodsWidget, 
    tagsWidget
  ),


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData()
    this.getFixTop()
  },

  initData: function() {
    var that = this

    configApi.getBanner(that)
    goodsApi.getCategory(that)
    goodsApi.GetGoodsList(that)
  },

  getFixTop: function() {
    var that = this
    wx.createSelectorQuery().select('.static-tags').boundingClientRect(function(rect) {
      that.setData({
        'fixTop': rect.top,
      })
    }).exec()
  },

  getUserInfo: function(res) {
  
  },
  onItemGoods: function(e) {
    wx.navigateTo({
      url: '../goodsdetails/goodsdetails?goodsId=' + e.currentTarget.id,
    })
  },

  swiperChange: function(e) {
    this.setData({
      'currentSwiper': e.detail.current
    });
  },

  onSwiperItemClick: function(e) {
    var clickItem = this.data.banners[e.currentTarget.dataset.current]
    event.event(clickItem)
  },

  onClickTag: function(e) {
    var that = this
    var tags = that.data.tags

    if (tags[e.currentTarget.id].id == that.data.tagId) {
      return;
    }

    for (var index in tags) {
      tags[index].check = false
    }

    tags[e.currentTarget.id].check = true
    var tagId = tags[e.currentTarget.id].id
    that.setData({
      tagId: tagId,
      tags : tags,
      pageIdx: 1,
      retArr: []
    })

    goodsApi.GetGoodsList(that)
    that.onScrollTagView()
  },

  onScrollTagView: function() {
    var that = this
    var isTagShow = that.data.isTagShow
    var fixTop = that.data.fixTop
    if (!isTagShow) {
      return;
    }

    wx.pageScrollTo({
      scrollTop: fixTop,
      duration: 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    that.setData({
      swiperAutoplay : true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      swiperAutoplay : false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageIdx: 1,
      retArr : []
    });
    goodsApi.GetGoodsList(this)
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 600)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      pageIdx: this.data.pageIdx+1
    });
    goodsApi.GetGoodsList(this)
  },

  onShareAppMessage: function(res) {
    return {
      title: '点击进入好物中心',
      path: '/pages/index/index'
    }
  },

  onPageScroll: function(res) {
    var that = this
    var isTagShow = that.data.isTagShow
    var fixTop = that.data.fixTop
    if (fixTop <= 0) {
      that.setData({
        isTagShow : false
      });
      return;
    }

    var scrollTop = res.scrollTop;
    if (fixTop < scrollTop) {
      if (!isTagShow) {
        that.setData({
          isTagShow : true
        });
      }
    } else {
      if (isTagShow) {
        that.setData({
          isTagShow : false
        });
      }
    }
  }
})