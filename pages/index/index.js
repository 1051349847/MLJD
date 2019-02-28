//index.js
//获取应用实例
const app = getApp()
const eapi = getApp().url
var images = []
var videox = []
var list = [];
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
var api = require('../../config/api.js');
Page({
  data: {
    flag: false,
    flce: true,
    nons: false,
    display: 'none',
    imgbox: [], //上传图片,
    img: '',
    images: [],
  },
  showview: function() {
    this.setData({
      display: "block",
      nons: true
    })

  },
  hideview: function() {
    this.setData({
      display: "none",
      nons: false,
    })
    
  },

  a: function() {
    this.setData({
      flag: false
    })
  },
  b: function() {
    this.setData({
      flag: true
    })
    
  },
  // 删除照片 &&
  imgDelete1: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.images;
    imgbox.splice(index, 1)
    images = imgbox;
    that.setData({
      images: imgbox
    });
  },
  // 上传图片
  addPic1: function(e) {
    // 限制上传张数
    if (images.length >= 5) {
      // var images = []
      wx.showToast({
        icon: 'none',
        title: '限制上传5张图片',
      })
      return false
    }
    var imgbox = this.data.imgbox;
    var picid = e.currentTarget.dataset.pic;
    var that = this;
    var n = 3;
    if (3 > imgbox.length > 0) {
      n = 3 - imgbox.length;
    } else if (imgbox.length == 3) {
      n = 1;
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图 
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          wx.uploadFile({
            header: {
              'Content-Type': 'application/json'
            },
            url: "https://mljg.lanwang168.com" + '/api/v1/upLoadImg',
            filePath: res.tempFilePaths[i],
            name: 'file',
            formData: {
              'file': res.tempFilePaths[i],
            },
            success: function(res) {
              that.setData({
                img: JSON.parse(res.data).data.src
              })
              images.push(JSON.parse(res.data).data.src)
              that.setData({
                images: images
              })
              
              var data = res.data
              

            },
            fail: function(rs) {
              
            }
          })
        }

      }

    })
  },
  // 上传图片
  addPic2: function(e) {
    // 限制上传张数
    if (images.length >= 5) {
      // var images = []
      wx.showToast({
        icon: 'none',
        title: '限制上传5张图片',
      })
      return false
    }
    var imgbox = this.data.imgbox;
    var picid = e.currentTarget.dataset.pic;
    var that = this;
    var n = 3;
    if (3 > imgbox.length > 0) {
      n = 3 - imgbox.length;
    } else if (imgbox.length == 3) {
      n = 1;
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图
        
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          
          wx.uploadFile({
            header: {
              'Content-Type': 'application/json'
            },
            url: "https://mljg.lanwang168.com" + '/api/v1/upLoadImg',
            filePath: res.tempFilePaths[i],
            name: 'file',
            formData: {
              'file': res.tempFilePaths[i],
            },
            success: function(res) {
              that.setData({
                img: JSON.parse(res.data).data.src
              })
              images.push(JSON.parse(res.data).data.src)
              that.setData({
                images: images
              })
              
              var data = res.data
              

            },
            fail: function(rs) {
             
            }
          })
        }

      }

    })
  },
  // 留言信息
  content: function(e) {

    let that = this
    that.setData({
      content: e.detail.value,
      length: e.detail.cursor
    })
  },
  // 姓名
  real_name: function(e) {

    let that = this
    that.setData({
      real_name: e.detail.value
    })
  },
  // 联系方式
  mobile: function(e) {

    let that = this
    that.setData({
      mobile: e.detail.value
    })
  },
  // 公司名称
  getDisplayName: function(e) {

    let that = this
    that.setData({
      getDisplayName: e.detail.value
    })
  },
  // 公司地点
  Company_location: function(e) {

    let that = this
    that.setData({
      Company_location: e.detail.value
    })
  },
  // 设备名称
  Device_name: function(e) {

    let that = this
    that.setData({
      Device_name: e.detail.value
    })
  },
  // 设备编号
  Device_number: function(e) {
    let that = this
    that.setData({
      Device_number: e.detail.value
    })
  },

  submit: function() {
  
    var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    // var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    let that = this
    if (that.data.images == '') {
      wx.showToast({
        icon: 'none',
        title: '请上传图片',
      })
      return false
    } else if (that.data.content == undefined) {
      wx.showToast({
        icon: 'none',
        title: '请填写用户留言信息',
      })
      return false
    } else if (that.data.real_name == undefined) {
      wx.showToast({
        icon: 'none',
        title: '请填写姓名',
      })
      return false
    } else if (that.data.mobile == undefined) {
      wx.showToast({
        icon: 'none',
        title: '请填写联系方式',
      })
      return false
    } else if (!myreg.test(that.data.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      })
      return false
    } else if (that.data.getDisplayName == undefined || that.data.getDisplayName == '') {
      wx.showToast({
        icon: 'none',
        title: '请填写公司名称',
      })
      return false
    } else if (that.data.Company_location == undefined || that.data.Company_location == '') {
      wx.showToast({
        icon: 'none',
        title: '请填写公司地点',
      })
      return false
    } else if (that.data.Device_name == undefined) {
      wx.showToast({
        icon: 'none',
        title: '请填写设备名称',
      })
      return false
    } else if (that.data.Device_number == undefined) {
      var data = {
        images: that.data.images, //图片
        message: that.data.content, //用户留言信息
        user_name: that.data.real_name, //姓名
        phone: that.data.mobile, //联系方式
        company_name: that.data.getDisplayName, //公司名称
        address: that.data.Company_location, //公司地点
        equipment_name: that.data.Device_name, //设备名称
        // equipment_id: 1, //设备编码
      }
    } else {
      var data = {
        images: that.data.images, //图片
        message: that.data.content, //用户留言信息
        user_name: that.data.real_name, //姓名
        phone: that.data.mobile, //联系方式
        company_name: that.data.getDisplayName, //公司名称
        address: that.data.Company_location, //公司地点
        equipment_name: that.data.Device_name, //设备名称
        equipment_code: that.data.Device_number, //设备编号，
        equipment_id: 1, //设备编码
      }
    }
    util.request(api.MemberInfo, data).then(function(res) {
      if (res.code == 20000) {
        that.setData({
          display: 'block',
          nons: true
        })
        setTimeout(function() {
          wx.switchTab({
            url: '/pages/user/user',
          })
        }, 1000)
      }
    })
  },
  onLoad: function(options) {
    
    let that = this
    // 获取设备编号
    if (options.id == undefined) {
        console.log('没有 ID')
    } else {
      let id = options.id;
      let data = {
        id: id
      }
      util.request(api.OPSFactory, data).then(function(res) {
        that.setData({
          Device_name: res.data.equipment_name,
          Device_number: res.data.equipment_code
        })
      })
    }
  },
  // 用户授权回调
  onShow: function() {},
  onHide:function(){
    
    let that=this
    that.setData({
      display: 'none',
      nons: false,
    })
  },
  onUnload: function() {
   
  }

})