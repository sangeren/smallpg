// var serviceHost = 'http://wx.tiaomady.com/api/';
var serviceHost ='https://wx.playtennis.cn/api/'
function formatTimeByDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function formatTimeByTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

//请求失败默认处理
function requestFail(n) {
  // wx.showModal({
  //   title: 'cw',
  //   content: 'content',
  //   showCancel: false,
  //   cancelText: '',
  //   cancelColor: '',
  //   confirmText: '',
  //   confirmColor: '',
  //   success: function (res) { },
  //   fail: function (res) { },
  //   complete: function (res) { },
  // })
  wx.showToast({
    title: n,
  })
}
// http 请求
function httpRquest(url, data, method, header, success, fail, that, complete) {

  if (method == undefined) {
    method = 'GET';
  }
  if (header == undefined) {
    header = {};
  }
  if (fail == undefined) {
    fail = requestFail;
  }
  if (complete == undefined) {

  }
  wx.request({
    url: serviceHost + url,
    data: data,
    method: method,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if ((res.statusCode == 200 || res.statusCode == 204) && typeof success == "function") {
        if (that) {
          success(that, res.data);
        }
        else {
          success();
        }
      }
      else if (res.statusCode == 404 && typeof success == "function") {
        fail('网络地址异常！');
      }
      else {
        console.log(2)
        typeof fail == "function" && fail(res.errMsg);
      }
    },
    fail: function (res) {
      typeof fail == "function" && fail(res);
    },
    complete: function () {
      typeof complete == "function" && complete();
    }
  })
}
//上传文件
function upload_file(url, filePath, fileName, formData, success, fail, that) {
  console.log('a=' + filePath);
  if (fail == undefined) {
    fail = requestFail;
  }

  wx.uploadFile({
    url: serviceHost + url,
    filePath: filePath,
    name: fileName,
    header: {
      'content-type': 'nultipart/form-data'
    },
    formData: formData,  //http请求中其他额外的form data
    success: function (res) {
      if (res.statusCode == 200 && typeof success == "function") {
        if (that) {
          success(that, res.data);
        }
        else {
          success();
        }
      } else {
        console.log(2)
        typeof fail == "function" && fail(res.data);
      }
    },
    fail: function (res) {
      console.log(res);
      typeof fail == "function" && fail(res);
    }
  })
}
module.exports = {
  formatTimeByDate: formatTimeByDate,
  formatNumber: formatNumber,
  formatTimeByTime: formatTimeByTime,
  formatLocation: formatLocation,
  httpRquest: httpRquest,
  upload_file: upload_file
}
