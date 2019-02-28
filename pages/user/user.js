// pages/user/user.js

const app = getApp()
const eapi = getApp().url
var contentlist = [];
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
var api = require('../../config/api.js');
var currt = '1'
// var page=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logins: false,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    url: eapi,
    reach: true,
    hideHeader: true,
    hideBottom: true,
    currt: 1,
    pageSize: 30,
    hasMoreData: true,
    page: 1, //请求的p
    pageSize: 3, //请求一次最多的数据
    currentPage: 1,
    articles: [] // 存放所有的文章
  },
  // 审核中
  auditing: function() {
    var that = this
    var currentPage = 1;
    var tips = "加载第" + (currentPage + 1) + "页";

    wx.showLoading({
      title: '加载中',
    })
    let data = {
      is_pass: 0,
      page: 1,
      size: that.data.pageSize
    }
    // 审核中
    util.request(api.User_info, data).then(function(res) {
      wx.hideLoading();
      var data = res.data; // 接口相应的json数据
      var articles = res.data.feedBackList; // 接口中的data对应了一个数组，这里取名为 articles

      that.setData({
        number_1: res.data.p0,
        number_2: res.data.p1,
        number_3: res.data.p2,
        articles: res.data.feedBackList,
        articles: articles,
        currentPage: currentPage
      })
    })

  },
  // 审核成功
  auditing_SUCCESSFUL: function() {
    var that = this
    var currentPage = 1;
    var tips = "加载第" + (currentPage + 1) + "页";

    wx.showLoading({
      title: '加载中',
    })
    let data = {
      is_pass: 1,
      page: 1,
      size: that.data.pageSize
    }
    // 审核中
    util.request(api.User_info, data).then(function(res) {
      wx.hideLoading();
      var data = res.data; // 接口相应的json数据
      var articles = res.data.feedBackList; // 接口中的data对应了一个数组，这里取名为 articles

      that.setData({
        number_1: res.data.p0,
        number_2: res.data.p1,
        number_3: res.data.p2,
        articles: res.data.feedBackList,
        articles: articles,
        currentPage: currentPage
      })
    })

  },
  // 审核失败
  auditing_failure: function() {
    var that = this
    var currentPage = 1;
    var tips = "加载第" + (currentPage + 1) + "页";

    wx.showLoading({
      title: '加载中',
    })
    let data = {
      is_pass: 2,
      page: 1,
      size: that.data.pageSize
    }
    // 审核中
    util.request(api.User_info, data).then(function(res) {
      wx.hideLoading();
      var data = res.data; // 接口相应的json数据
      var articles = res.data.feedBackList; // 接口中的data对应了一个数组，这里取名为 articles

      that.setData({
        number_1: res.data.p0,
        number_2: res.data.p1,
        number_3: res.data.p2,
        articles: res.data.feedBackList,
        articles: articles,
        currentPage: currentPage
      })
    })

  },
  swichNav1: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        currt: 1
      })
    }
    currt = '1'
    this.auditing()
  },
  swichNav2: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        currt: 2
      })
    }
    currt = '2'
    this.auditing_SUCCESSFUL()
  },
  swichNav3: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        currt: 3
      })
    }
    currt = '3'
    this.auditing_failure()
  },
  bindChange: function(e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
  },
  d3: function(e) {
    wx.navigateTo({
      url: '/pages/details3/details3?danger_id=' + e.target.dataset.id,
    })
  },
  d2: function(e) {
    wx.navigateTo({
      url: '/pages/details2/details2?danger_id=' + e.target.dataset.id,
    })
  },
  d1: function(e) {
    wx.navigateTo({
      url: '/pages/details1/details1?danger_id=' + e.target.dataset.id,
    })
  },
  onLoad: function(options) {

  },
  onShow: function() {
    if (currt == '1') {
      this.auditing()
    } else if (currt == '2') {
      this.auditing_SUCCESSFUL()
    } else if (currt == '3') {
      this.auditing_failure()
    }
  },
  loadMoreData_1: function() {
    var that = this
    if (that.data.articles.length == that.data.number_1) {
      wx.showToast({
        icon: "none",
        title: '亲，没有数据了',
      })
      return false
    }
    var currentPage = that.data.currentPage; // 获取当前页码
    currentPage += 1; // 加载当前页面的下一页数据
    var tips = "加载第" + (currentPage + 1) + "页";
    wx.showLoading({
      title: '加载中',
    })
    let data = {
      is_pass: 0,
      size: that.data.pageSize,
      page: currentPage
    }
    util.request(api.User_info, data).then(function(res) {
      wx.hideLoading();
      var currentPage = that.data.currentPage; // 获取当前页码
      currentPage += 1;
      var data = res.data; // 接口相应的json数据
      var articles = res.data.feedBackList; // 接口中的data对应了一个数组，这里取名为 articles
      // 将新一页的数据添加到原数据后面
      var originArticles = that.data.articles;
      var newArticles = originArticles.concat(articles);
      that.setData({
        articles: newArticles,
        currentPage: currentPage
      })
    }), res => {}
  },
  loadMoreData_2: function() {
    var that = this
    if (that.data.articles.length == that.data.number_2) {
      wx.showToast({
        icon: "none",
        title: '亲，没有数据了',
      })
      return false
    }
    var currentPage = that.data.currentPage; // 获取当前页码
    currentPage += 1; // 加载当前页面的下一页数据
    var tips = "加载第" + (currentPage + 1) + "页";
    wx.showLoading({
      title: '加载中',
    })
    let data = {
      is_pass: 1,
      size: that.data.pageSize,
      page: currentPage
    }
    util.request(api.User_info, data).then(function(res) {
      wx.hideLoading();
      var currentPage = that.data.currentPage; // 获取当前页码
      currentPage += 1;
      var data = res.data; // 接口相应的json数据
      var articles = res.data.feedBackList; // 接口中的data对应了一个数组，这里取名为 articles
      // 将新一页的数据添加到原数据后面
      var originArticles = that.data.articles;
      var newArticles = originArticles.concat(articles);
      that.setData({
        articles: newArticles,
        currentPage: currentPage
      })
    }), res => {}
  },
  loadMoreData_3: function() {
    var that = this
    if (that.data.articles.length == that.data.number_3) {
      wx.showToast({
        icon: "none",
        title: '亲，没有数据了',
      })
      return false
    }
    var currentPage = that.data.currentPage; // 获取当前页码
    currentPage += 1; // 加载当前页面的下一页数据
    var tips = "加载第" + (currentPage + 1) + "页";
    wx.showLoading({
      title: '加载中',
    })
    let data = {
      is_pass: 2,
      size: that.data.pageSize,
      page: currentPage
    }
    util.request(api.User_info, data).then(function(res) {
      wx.hideLoading();
      var currentPage = that.data.currentPage; // 获取当前页码
      currentPage += 1;
      var data = res.data; // 接口相应的json数据
      var articles = res.data.feedBackList; // 接口中的data对应了一个数组，这里取名为 articles
      // 将新一页的数据添加到原数据后面
      var originArticles = that.data.articles;
      var newArticles = originArticles.concat(articles);
      that.setData({
        articles: newArticles,
        currentPage: currentPage
      })

    }), res => {

    }

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






  onReady: function() {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },


  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})