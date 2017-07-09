var util = require('../../../utils/util.js')
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
    },
    appointmentType: 0,
    appointmentId: undefined,
    imageArrange: [],
    imagePathArray: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('--------purpose-detail-onLoad-333333')
    console.log(options)
    var that = this;
    //baseinfo 用户id
    that.data.purposeUserId = options.id;
    that.data.appointmentId = options.appointmentId;
    that.setData({
      appointmentType: options.type
    })

    var appInstance = getApp();
    that.data.userid = appInstance.baseUserid;
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
    util.httpRquest('UploadFile/' + app.userInforId, undefined, undefined, undefined,
      function (that, data) {
        var lineLength = data.length / 3;
        var ia = [];
        for (i = 0; i < lineLength; i++) {
          ia[i] = i;
        }
        console.log('call back')
        that.setData({
          imageArrange: ia
        });
        that.setData({
          imagePathArray: data
        });
      }, undefined, that);
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindSendAPleaes: function (e) {
    console.log('a click')
    console.log(e)
    //e.detail.formId
    var that = this;
    console.log(that)

    var AppointmentDto = { inviteeId: that.data.userInformation.userBaseInfoId, exercisePurposeId: that.data.userInformation.exercisePurpose.id, formId: e.detail.formId }

    console.log(app.host + 'Appointment/' + that.data.userid)
    console.log('---22333')
    console.log(AppointmentDto)
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
  },
  bindReceiveAppoint: function (e) {
    var that = this;

    console.log('a click')
    console.log(e)
    console.log(app.host + 'Appointment1/' + that.data.userid)
    console.log(AppointmentDto)
    console.log(that)

    var AppointmentDto = {
      inviteeId: that.data.userInformation.userBaseInfoId,
      //exercisePurposeId: that.data.userInformation.exercisePurpose.id,
      formId: e.detail.formId,
      ActionType: 0,
      appointmentId: that.data.appointmentId
    }
    var content = '恭喜您完成了预约流程！可以通过[进行的预约]来明确线下的运动！';



    OperateAppoint(that, AppointmentDto, content);
  },
  bindRefuseAppoint: function (e) {
    var that = this;
    var AppointmentDto = {
      inviteeId: that.data.userInformation.userBaseInfoId,
      //exercisePurposeId: that.data.userInformation.exercisePurpose.id,
      formId: e.detail.formId,
      ActionType: 1,
      appointmentId: that.data.appointmentId
    }
    var content = '就是任性！';

    console.log('a click')
    console.log(e)
    console.log(app.host + 'Appointment/' + that.data.userid)
    console.log(AppointmentDto)

    OperateAppoint(that, AppointmentDto, content);
  },
  lookImage: function (e) {
    console.log('ee' + e);
    wx.navigateTo({
      url: '/pages/input-purpose/iamge-edit/iamge-details/iamge-details?id=' + e.target.id,
    })
  }
})
function OperateAppoint(that, AppointmentDto, content) {
  wx.request({
    url: app.host + 'Appointment/' + that.data.userid,
    data: AppointmentDto,
    method: 'PUT', // OPTIONS, GET, HEAD, POST, , DELETE, TRACE, CONNECT
    header: { 'Content-Type': 'application/json' }, // 设置请求的 header
    success: function (res) {
      // success
      wx.showModal({
        title: '操作成功',
        content: content,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 2
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