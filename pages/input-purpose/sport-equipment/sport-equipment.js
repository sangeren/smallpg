// pages/input-purpose/sport-equipment/sport-equipment.js
Page({
  data: {
    wxUserid: '',
    arrayRacket: ['0', '1', '2', '3', '4', '5'],
    arrayTennis: ['0', '5', '10', '15', '20', '30', '50'],
    sportsEquipment: {
      id: '',
      tennisRacketCount: '1',
      tennisCount: '1'
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.wxUserid = options.userid;
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    var appInstance = getApp();
    wx.request({
      url: appInstance.host + 'SportsEquipment/' + appInstance.userid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        if (res.data == null)
          return;
        that.setData({ sportsEquipment: res.data })
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
    this.data.sportsEquipment.tennisRacketCount = e.detail.value;
    this.setData({ sportsEquipment: this.data.sportsEquipment })
  },
  bindPlayAgePickerChange: function (e) {
    this.data.sportsEquipment.tennisCount = e.detail.value;
    this.setData({ sportsEquipment: this.data.sportsEquipment })
  },
  buttonSaveTap:function(e){
    var that = this;
    var appInstance = getApp()

    var methodStr = '';
    var id = '';
    if (that.data.sportsEquipment.id == '') {
      methodStr = 'POST';
      id = appInstance.userid;
    }
    else {
      methodStr = 'PUT';
      //id = that.data.baseInfor.id;
    }
    wx.request({
      url: appInstance.host + 'sportsEquipment/' + id,
      data: that.data.sportsEquipment,
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
  }
})