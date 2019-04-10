//app.js
var userApi = require('/api/user.js');

App({
  globalData: {    
    itapiBase: "https://api.it120.cc/haveamall",
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