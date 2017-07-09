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
              console.log('location information')
              console.log(res);

              that.globalData.userInfo = res.userInfo
              var gender = res.userInfo.gender - 1;
              if (gender <= -1) { gender = 2 }
              var url = that.host + 'UserLogin/' + res1.code + '?nickName=' + res.userInfo.nickName + '&avatarUrl=' + res.userInfo.avatarUrl + '&gender=' + gender + '&province=' + res.userInfo.province + '&city=' + res.userInfo.city;
              wx.request({
                url: url,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function (res2) {
                  //WxUserId
                  console.log('userlogin--------------')
                  console.log(res2)
                  that.userid = res2.data.wxUserId;
                  that.baseUserid = res2.data.userId;
                  that.userInforId = res2.data.userInforId;

                  that.globalData.userid = res2.data.wxUserId;
                  that.globalData.baseUserid = res2.data.userId;

                  typeof cb == "function" && cb(res2.data.wxUserId)
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
  baseUserid: null,
  userInforId: undefined,
  // host: 'https://wx.tiaomady.com/api/'
  host: 'https://wx.playtennis.cn/api/'
})