//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userLocation: {},
    purposeList: []
  },
  //事件处理函数
  purposeDetail: function (e) {
    // console.log('-------purpose-purposeList-purposedetaul-------22')
    // console.log(e)
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: './purpose-detail/purpose-detail?id=' + id
    })
  },
  onLoad: function () {
    var that = this;
    console.log('onLoad')
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.data.userLocation = res;
      }
    });
  },
  onShow: function () {
    var that = this;
    var appInstance = getApp();

    if (appInstance.userid == '' || appInstance.userid == undefined)
    { return; }
    var pageIndex = 1;
    var queryStr = 'pageIndex=' + pageIndex + '&lat=' + that.data.userLocation.latitude + '&lon=' + that.data.userLocation.longitude;
    console.log(queryStr)

    wx.request({
      url: appInstance.host + 'ExercisePurpose/' + appInstance.userid + '?' + queryStr,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data == undefined || res.data == null) {
          return;
        }
        that.setData({
          purposeList: res.data
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log('purposeList')
        console.log(res)
      }
    });
  }
})
