// pages/purpose-list/purpose-detail/purpose-detail.js
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    array: ['男', '女', '保密'],
    arrayAge: ['0', '1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年'],
    arrayRacket: ['0', '1', '2', '3', '4', '5'],
    arrayTennis: ['0', '5', '10', '15', '20', '30', '50'],
    userInfo: null,
    userid: '',
    userInformation: {
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('--------purpose-detail-onLoad-333333')
    console.log(options)
    this.data.userid = options.id;
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    wx.request({
      url: app.host + 'UserInformation/' + this.data.userid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        if (res.data != undefined) {
          that.setData({
            userInformation: res.data
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log('purpose-detail-UserInformation----3333-------5555')
        console.log(res)
      }
    });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindSendAPleaes:function(){
    
  }
})