// pages/heroes/heroes.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:'',
    nickname:'',
    check_pass:'',
    head_pic:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    app.request("GET", "/api/v1/rank").then(res => {
      console.log(res)
      that.setData({
        datas: res.data.data,
        nickname: res.data.data.nickname,
        check_pass: res.data.data.check_pass,
        head_pic: res.data.data.head_pic
      })

    }, res => { })
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