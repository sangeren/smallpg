//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userCentre: {}
  },
  //事件处理函数
  receiveAppointment: function () {
    console.log('333aaa')
    console.log(this)

    if (this.data.userCentre == undefined || this.data.userCentre.isReceiveAppointment == undefined || this.data.userCentre.isReceiveAppointment == false) {
      showMyModal('tips', '很抱歉暂未收到预约，完善个人信息有助于收到预约！')
    }
    else {
      wx.navigateTo({
        url: './appointment-list/appointment-list'
      })
    }
  },
  //进行的运动 {"isReceiveAppointment":false,"isExerciseIng":true,"isComplishExercise":false}
  exerciseing: function () {
    if (this.data.userCentre == undefined || this.data.userCentre.isReceiveAppointment == undefined || this.data.userCentre.isExerciseIng == false) {
      showMyModal('tips', '暂木有进行的预约！')
    }
    else {
      wx.navigateTo({
        url: './purpose-ing/purpose-ing'
      })
    }
  },
  //过往的运动
  exerciseed: function () {
    if (this.data.userCentre == undefined || this.data.userCentre.isReceiveAppointment == undefined || this.data.userCentre.isComplishExercise == false) {
      showMyModal('tips', '列表空空如也，不妨去完成一次运动！')
    } else {
      wx.navigateTo({
        url: './purpose-list/purpose-list'
      })
    }

  },
  onShow: function () {
    var that = this;
    console.log('onLoad')
    // UserCentre
    var appInstance = getApp();

    wx.request({
      url: appInstance.host + 'UserCentre/' + appInstance.userInforId,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        if (res.data == undefined || res.data == null) {
          return;
        }
        that.data.userCentre = res.data;
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log('userCentre')
        console.log(res)
      }
    });
  }
})
function showMyModal(title, message) {
  wx.showToast({
    title: message,
    duration: 2800
  })
  // wx.showModal({
  //   title: title,
  //   content: message,
  //   showCancel: false,
  //   success: function (res) {
  //     if (res.confirm) {
  //       wx.navigateBack({
  //         // delta: 1
  //       })
  //     }
  //   }
  // })
}