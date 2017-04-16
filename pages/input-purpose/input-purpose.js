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
    userInfo: {},
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
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo: userInfo
      })
      //调用登录接口
      wx.login({
        success: function (res1) {
          console.log(res1);
          var gender = userInfo.gender - 1;
          var url = app.host + 'UserLogin/' + res1.code + '?nickName=' + userInfo.nickName + '&avatarUrl=' + userInfo.avatarUrl + '&gender=' + userInfo.gender;
          wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res) {
              app.userid = res.data;
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
    });
    // that.getUserInfo(function (userInfo) {

    // });
  },
  onShow: function () {
    console.log('input-purpose-onShow')
    var that = this;
    var appInstance = getApp();
    console.log(appInstance)
    wx.request({
      url: appInstance.host + 'UserInformation/' + appInstance.userid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
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
        console.log('UserInformation')
        console.log(res)
      }
    });
  }
})
