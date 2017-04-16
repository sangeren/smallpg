//app.js
App({
  onLaunch: function () {
    var that = this;
    that.getUserInfo(function (userInfo) {
      //调用登录接口
      wx.login({
        success: function (res1) {
          console.log(res1);
          var gender = userInfo.gender - 1;
          var url = that.host + 'UserLogin/' + res1.code + '?nickName=' + userInfo.nickName + '&avatarUrl=' + userInfo.avatarUrl + '&gender=' + userInfo.gender;
          wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res) {
              that.userid = res.data;
            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
              console.log(res);
            }
          })
        }
      })
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  userid: '',
  host: 'https://wx.tiaomady.com/api/'
})