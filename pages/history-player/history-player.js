//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  receiveAppointment: function () {
    wx.navigateTo({
      url: './appointment-list/appointment-list'
    })
  },
  //进行的运动
  exerciseing: function () {
    wx.navigateTo({
      url: './purpose-ing/purpose-ing'
    })
  },
  //过往的运动
  exerciseed: function () {
    wx.navigateTo({
      url: './purpose-list/purpose-list'
    })
  },
  onLoad: function () {
    console.log('onLoad')

  }
})
