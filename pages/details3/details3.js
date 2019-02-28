// pages/details3/details3.js
const app = getApp()
const eapi = getApp().url
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    indicatorColor: "rgb(245,75,93)",
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    danger:'',
    content:'',
    happen_address:'',
    url: eapi,
    images: '',
    index: '1',
  },
  bindchange: function (e) {
    this.setData({
      index: e.detail.current + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let danger_id = options.danger_id;
    let data={
      id: danger_id
    }
    util.request(api.Deatil, data).then(function (res) {
    
      that.setData({
        images: res.data.img,
        feedBack: res.data.feedBack
      })
    }), res => {

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})