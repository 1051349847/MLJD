// pages/login/login.js
var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  wxLogin: function (e) {
    let than = this
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }, 1000)
      return;
    }
    wx.showLoading({
      title: '登录中',
    })
    user.checkLogin().catch(() => {
      user.loginByWeixin(e.detail.userInfo).then(res => {
        console.log(res)
        var userInfo = wx.getStorageSync("userInfo")
        wx.setStorageSync("userInfo", userInfo)
        setTimeout(function () {
          console.log(123)
          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          })
        }, 2000);
      }).catch((err) => {
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      });

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 用户授权回调
  onGotUserInfo: function(e) {
    let isExistUserInfo = wx.getStorageSync('userInfo');
    if (isExistUserInfo) {
      console.log("登录哦")
    } else {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      let userInfoValue = wx.getStorageSync('userInfo');
      // 判断用户点击的是授权还是拒绝
      if (userInfoValue) {
        // 用户点击授权按钮
        wx.setStorageSync('userInfo', e.detail.userInfo) //存储用户本地基本信息
        wx.setStorageSync("UID", e.detail.encryptedData)
        app.login().then(res => {
          console.log(res)
          this.onShow()
        }, res => {});
      } else {
        console.error('用户点击拒绝授权！');
      }
    }
  },
})