//index.js
//获取应用实例
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
      // userBaseInfo: {},
      // exercisePurpose: {},
      // sportsEquipment: {},
      // tennisCourts: {}
    }
  },
  //编辑打球意向
  bindEditPurposeTap: function () {
    wx.navigateTo({
      url: './edit-purpose/edit-purpose'
    })
  },
  //编辑基本信息
  bindBaseInforTap: function () {
    wx.navigateTo({
      url: './base-infor/base-infor?userid=' + this.data.userid
    })
  },
  //编辑运动装备
  bindSportEquipmentTap: function () {
    wx.navigateTo({
      url: './sport-equipment/sport-equipment?userid=' + this.data.userid
    })
  },
  //编辑球场信息
  bindTennisCourtTap: function () {
    wx.navigateTo({
      url: './tennis-court/tennis-court?userid=' + this.data.userid
    })
  },
  onLoad: function () {
    //调用应用实例的方法获取全局数据-用户信息
  },
  onShow: function () {
    console.log('----------input-purpose-onShow---------2222')
    var that = this;
    console.log(app)
    app.getUserid(function (userid) {
      //更新数据
      if (that.userInfo == undefined) {
        that.setData({
          userInfo: app.globalData.userInfo
        })
      }
      wx.request({
        url: app.host + 'UserInformation/' + userid,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          // success
          that.setData({
            userInformation: res.data
          })
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
          console.log('UserInformation-----------5555')
          console.log(res)
        }
      });
    })
  }
})
