//app.js
var userApi = require('/api/user.js');

App({
  globalData: {    
    itapiBase: "https://api.it120.cc/haveamall",
    merchantName: '青姿',
    pageSize:15,
    userInfo: {}
  },
  onLaunch: function() {
    var that = this
    userApi.Login(this);
  },

  onShow: function(options) {
    var path = options.path
  },

  onHide: function() {

  },

})