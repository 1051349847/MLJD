var api = require('../config/api.js');
var app = getApp();

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Litemall-Token': wx.getStorageSync('token')
      },
      success: function(res) {
        if (res.data.code == 20000) {
          resolve(res.data);
        } else if (res.data.code == 30003) {
          // 清除登录相关内容
          try {
            wx.removeStorageSync('userInfo');
            wx.removeStorageSync('token');
          } catch (e) {
            // Do something when catch error
          }
          // 切换到登录页面
          wx.navigateTo({
            url: '/pages/login/login'
          });
        } else {
          // showErrorToast(res.data.message)
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

function checkoutBindJoin() {
  let userInfo = wx.getStorageSync("userInfo")
  if (userInfo.phone == "0") {
  
    wx.navigateTo({
      url: '/pages/auth/login/login?types=phone',
    })
  }
}

module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast,
  checkoutBindJoin
}