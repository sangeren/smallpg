// pages/input-purpose/base-infor/base-infor.js
Page({
  data: {
    //wxUserid: '',
    array: ['男', '女', '保密'],
    arrayAge: ['0', '1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年'],
    baseInfor: {
      id: '',
      gender: 0,
      playAge: 0,
      nowAddress: ''
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //console.log(options)
    //this.data.wxUserid = options.userid;
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    var appInstance = getApp();
    wx.request({
      url: appInstance.host + 'BaseInfor/' + appInstance.userid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        if (res.data == null)
          return;
        that.setData({ baseInfor: res.data })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log('3333-baseinfor')
        console.log(res);
      }
    });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindFormSubmit: function (e) {
    var that = this;
    var appInstance = getApp()
    that.data.baseInfor.nowAddress = e.detail.value.textarea;

    var methodStr = '';
    var id = '';
    if (that.data.baseInfor.id == '') {
      methodStr = 'POST';
      id = appInstance.userid;
    }
    else {
      methodStr = 'PUT';
      //id = that.data.baseInfor.id;
    }
    wx.request({
      url: appInstance.host + 'BaseInfor/' + id,
      data: that.data.baseInfor,
      method: methodStr, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'Content-Type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        // success
        wx.switchTab({
          url: '/pages/input-purpose/input-purpose'
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log(res);
      }
    })
  },
  bindGenderPickerChange: function (e) {
    this.data.baseInfor.gender = e.detail.value;
    this.setData({ baseInfor: this.data.baseInfor })
  },
  bindPlayAgePickerChange: function (e) {
    this.data.baseInfor.playAge = e.detail.value;
    this.setData({ baseInfor: this.data.baseInfor })
  },
})