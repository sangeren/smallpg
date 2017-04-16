// pages/input-purpose/tennis-court/tennis-court.js
Page({
  data: {
    // tennisCourt: {
    // }
    hasLocation: false,
    id: '',
    courtName: '',
    openTime: '',
    courtAddress: '',
    userLocation: {
      speed: 0
    },
  },
  //wxUserid: '',
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.wxUserid = options.userid;
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    var appInstance = getApp();
    wx.request({
      url: appInstance.host + 'tennisCourt/' + appInstance.userid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        if (res.data == null)
          return;
        var hasLoc = false;
        if (res.data.courtAddress != '') {
          hasLoc = true;
        }
        that.setData({
          id: res.data.id,
          courtName: res.data.courtName,
          openTime: res.data.openTime,
          courtAddress: res.data.courtAddress,
          hasLocation: hasLoc,
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log('3333-sportsEquipment')
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
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.data.userLocation.longitude = res.longitude;
        that.data.userLocation.latitude = res.latitude;
        that.data.courtAddress = res.address;
        that.setData({
          hasLocation: true,
          courtAddress: res.address,
        })
      }
    })
  },
  saveCourt: function () {
    var that = this;
    var appInstance = getApp()

    var methodStr = '';
    var id = '';
    if (that.data.id == '') {
      methodStr = 'POST';
      id = appInstance.userid;
    }
    else {
      methodStr = 'PUT';
      //id = that.data.baseInfor.id;
    }

    console.log('location--33')
    console.log(that.data)
    wx.request({
      url: appInstance.host + 'tennisCourt/' + id,
      data: that.data,
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
    });
  },
  bindKeyCourtNameInput: function (e) {
    this.data.courtName = e.detail.value;
  },
  bindKeyOpenTimeInput: function (e) {
    this.data.openTime = e.detail.value;
  },
})