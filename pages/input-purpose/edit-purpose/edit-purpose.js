Page({
  data: {
    //wxUserid: '',
    date: '2016-09-01',
    startTime: '9:01',
    endTime: '18:01',
    location: {},
    purpose: {
      id: '',
      startTime: '9:01',
      endTime: '18:01',
      isCanChange: false,
      exerciseExplain: "很高兴打网球！",
      userLocation: {}
    }
  },
  onLoad: function () {
    var that = this;
    var myDate = new Date();
    var nowDate = myDate.toLocaleDateString().replace('/', '-').replace('/', '-');  //获取当前日期  
    that.setData({ date: nowDate });

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.data.location = res;
      }
    });
  },
  onShow: function () {
    // Do something when page show.
    var that = this;
    var appInstance = getApp();
    if (appInstance.userid == '') return;
    wx.request({
      url: appInstance.host + 'ExercisePurpose/' + appInstance.userid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        console.log(res)
        if (res.data == null)
          return;
        that.setData({ purpose: res.data })
        var startDate = res.data.startTime.substring(0, 10);
        that.setData({ date: startDate })

        var st = res.data.startTime.substr(11, 5);
        that.setData({ startTime: st });

        var et = res.data.endTime.substr(11, 5);
        that.setData({ endTime: et });
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log('3333-ExercisePurpose')
        console.log(res);
      }
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    console.log('bint-text-areablur')
    this.data.purpose.exerciseExplain = e.detail.value;
  },
  switchChange: function (e) {
    this.data.purpose.isCanChange = e.detail.value;
  },
  bindSubmitPurposeTap: function (e) {

  },
  bindFormSubmit: function (e) {
    var that = this;
    var appInstance = getApp()
    that.data.purpose.exerciseExplain = e.detail.value.textarea;

    //拼接日期
    that.data.purpose.startTime = that.data.date + ' ' + that.data.startTime;
    that.data.purpose.endTime = that.data.date + ' ' + that.data.endTime;
    that.data.purpose.userLocation = that.data.location;

    that.data.purpose.formId = e.detail.formId;
    console.log('---formid------')
    console.log(that.data);


    var methodStr = '';
    var id = '';
    if (that.data.purpose.id == '') {
      methodStr = 'POST';
      id = appInstance.userid;
    }
    else {
      methodStr = 'PUT';
      //id = that.data.purpose.id;
    }
    wx.request({
      url: appInstance.host + 'ExercisePurpose/' + id,
      data: that.data.purpose,
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


