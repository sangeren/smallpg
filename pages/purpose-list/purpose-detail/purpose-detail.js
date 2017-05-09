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
    purposeUserId: null,
    userInformation: {
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('--------purpose-detail-onLoad-333333')
    console.log(options)
    //baseinfo 用户id
    this.data.purposeUserId = options.id;

    var appInstance = getApp();
    this.data.userid = appInstance.baseUserid;
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    console.log('purpose---url')
    console.log(app.host + 'UserInformation/' + that.data.purposeUserId + '?idType=1&initiatorId=' + that.data.userid)
    wx.request({
      //D0EADBA0-63EB-475D-BAD4-354DCAF614A6
      url: app.host + 'UserInformation/' + that.data.purposeUserId + '?idType=1&initiatorId=' + that.data.userid,
      //url: app.host + 'UserInformation/2D4EC1C7-BBEB-43B7-9A0B-209F9035851C?idType=1',
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
  bindSendAPleaes: function () {
    var that = this;
    var AppointmentDto = { inviteeId: that.data.userInformation.userBaseInfoId, exercisePurposeId: that.data.userInformation.exercisePurposeId }
    wx.request({
      url: app.host + 'Appointment/' + that.data.userid,
      data: AppointmentDto,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'Content-Type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        // success
        wx.showModal({
          title: '操作成功',
          content: '已成功向对方发送邀请通知！完善个人信息有助于对方接受你的邀请！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })


      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log(res)
      }
    })
  }
})