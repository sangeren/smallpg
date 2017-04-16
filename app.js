//app.js
App({
  onLaunch: function () {
    console.log('app-onLaunch')
  },
  onShow: function () {
    console.log('app-onShow')
    // var that = this;
    // that.getUserInfo(function (userInfo) {
    //   console.log('-------------------app-onShow-getUserInfo')

    // });
  },
  getUserid: function (cb) {
    var that = this
    if (this.globalData.userid) {
      typeof cb == "function" && cb(this.globalData.userid)
    } else {
      //调用登录接口
      wx.login({
        success: function (res1) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              var gender = res.userInfo.gender - 1;
              var url = that.host + 'UserLogin/' + res1.code + '?nickName=' + res.userInfo.nickName + '&avatarUrl=' + res.userInfo.avatarUrl + '&gender=' + gender;
              wx.request({
                url: url,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function (res2) {
                  that.userid = res2.data;
                  that.globalData.userid = res2.data;
                  typeof cb == "function" && cb(res2.data)
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
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    userid: null
  },
  userid: '',
  host: 'https://wx.tiaomady.com/api/'
})