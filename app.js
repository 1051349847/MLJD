const eapi = 'http://192.168.3.87:8888'; //默认访问后台一级域名链接（页面全局变量）
var util = require('utils/util.js');
App({
  onLaunch: function() {
    wx.login({
      success: function(res) {
        if (res.code) {} else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  // 获取用户信息函数
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  url: 'http://192.168.3.87:8888', //默认访问后台一级域名链接（页面局部变量）
  login: function(eapi, that) { //用户登入
    wx.showLoading({
      title: '正在登录...',
    })
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          wx.hideLoading();
          if (res.code) { //获取登录凭证码，随机的，有效期5分钟
            wx.getStorage({
              key: 'userInfo',
              success: function(resStorage) {
                // 请求后台登录接口
                wx.request({
                  url: 'http://192.168.3.87:8888' + '/api/user/userReg',
                  method: 'POST',
                  data: {
                    userInfo: resStorage.data,
                    code: res.code,
                  },
                  success: function(ress) {
                    console.log(ress.data.code)
                    // 登录成功，后台返回用户相关数据
                    if (ress.data.code == 20000) {
                      if (ress.data.code == 20000) {
                        console.log(123)
                        wx.setStorageSync("user", ress.data.data) //注意字段：refresh_token用于刷新新的token
                        wx.setStorageSync("access_token", ress.data.data.access_token)
                        var value = wx.getStorageSync('access_token')
                        if (value) {
                          console.log('获取到的新token:' + value);
                          resolve(); //返回登录结果
                          console.log('登录成功啦');
                        }
                      }
                    } else if (res.code === 40006) {
                      reject('授权失败')
                      console.log('失败')
                    } else if (ress.statusCode === 404) {
                      reject('未找到页面(404)')
                    } else if (ress.statusCode === 500) {
                      reject('服务器错误(500)')
                    } else if (ress.statusCode === 422) {
                      reject('422请求格式正确，但是由于含有语义错误，无法响应。')
                    } else {
                      // 其他未知错误
                      reject(ress)
                    }
                  },
                  fail: function(ress) {
                    console.log(ress)
                  }
                })
              },
              fail: function(resStorage) {
                console.log(resStorage)
              }
            })
          }
        }
      })
    })
  },

  /*
   * http()  发送带有token的http请求
   * method  get,post,put,delete
   * url     请求链接
   * data    请求数据
   * return  Promise
   * example app.http('get', 'login', {}).then()
   */
  http: function(method, api, data = {}, header = {}) {
    header = Object.assign({
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-access-token': wx.getStorageSync('access_token'),
    }, header)
    return new Promise((resolve, reject) => {
      wx.request({
        url: eapi + api,
        data: data,
        method: method,
        header: header,
        success: function(r) {
          console.log(r)
          if (r.statusCode == 200) {
            if (r.data.code == 200) {
              resolve(r.data)
            } else if (r.data.code == 20001) {
              resolve(r.data)
            } else {
              reject(r.data.msg);
            }
          } else if (r.statusCode === 404) {
            reject('未找到页面(404)')
          } else if (r.statusCode === 500) {
            reject('服务器错误(500)')
          } else if (r.statusCode === 422) {
            reject(r.data)
          } else {
            console.log(22)
            reject('111')
          }
        },
        fail: function(r) {
          console.log(12)
          reject(r.errMsg || '出现错误(http fail)')
        }
      })
    })
  },
  /*
   * request()  发送http请求
   * method  get,post,put,delete
   * url     请求链接
   * data    请求数据
   * header  请求header
   * return  Promise
   * example app.request('get', 'login', {}).then()
   */
  request: function(method, api, data = {}, header = {}) {
    let that = this;
    wx.getStorage({
      key: 'toke',
      success: function(res) {
        console.log(res)
      },
    })
    header = Object.assign({
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-access-token': wx.getStorageSync('toke'),
    }, header)
    wx.showLoading({
      title: '加载中...',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: eapi + api,
        data: data,
        method: method,
        header: header,
        success: function(r) {
          wx.hideLoading();
          if (r.statusCode == 200) {
            if (r.data.code == 200) {
              resolve(r.data)
            } else if (r.data.code == 20001) {
              resolve(r.data)
            } else if (r.data.code == 20002) {
              resolve(r.data)
            } else if (r.data.code == 20003) {
              resolve(r.data)
            } else if (r.data.code == 20004) {
              resolve(r.data)
            } else if (r.data.code == 20005) {
              resolve(r.data)
            } else {
              reject(r.data.msg);
            }
          } else if (r.statusCode === 404) {
            reject('未找到页面(404)')
          } else if (r.statusCode === 500) {
            reject('服务器错误(500)')
          } else if (r.statusCode === 422) {

            reject(r.data)
            if (r.data.code != 200) {
              // 需要用户重新登录，获取新的token
              that.login().then(resLogin => {
                // 登录完成，用户需要重新请求该api
                console.log('输出需要重新请求的api:' + api)
                let header = Object.assign({
                  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  'x-access-token': wx.getStorageSync('access_token'),
                });
                console.log('header:' + header);
                that.request(method, api, data, header).then(res => {
                  console.log('重新登录后，重新请求api成功~');
                  resolve(r.data);
                }, res => {
                  console.error('重新登录后，重新请求api报错');
                  reject(res.data);
                })
              }, resLogin => {
                wx.showToast({
                  title: '用户登录失败',
                  icon: 'none',
                  duration: 3000
                })
              })


            } else {

            }


          } else if (r.statusCode == 420) {
            reject(r)
          } else {
            console.log(r)
            reject('未知错误22')
          }
        },
        fail: function(r) {
          reject(r.errMsg || '出现错误(http fail)')
          // 错误接口拦截
          // util.showBusy(r.errMsg);
        }
      })
    })
  },



})