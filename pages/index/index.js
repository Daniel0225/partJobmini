//index.js
//获取应用实例
const app = getApp()
var utilMd5 = require('../../utils/MD5.js');  
Page({
  /**
  * 页面的初始数据
  */
  data: {
    account: "",
    password: "",
    currentTab : 0
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'account',
      success: function (res) {
        that.setData({
          account: res.data
        })
      },
    }),
      wx.getStorage({
        key: 'password',
        success: function (res) {
          that.setData({
            password: res.data
          })
        },
      })
  },

  accountInput : function(e){
    this.data.account = e.detail.value
  },

  passwordInput : function(e){
    this.data.password = e.detail.value
  },

  selectUser : function(){
    this.setData({
      currentTab : 0
    })
  },
  selectCompany : function(){
    this.setData({
      currentTab : 1
    })
  },

  getToken:function(e){
    var that = this
    var timestamp = Date.parse(new Date()); 
    wx.showLoading({
      title: '正在登录',
    })
    wx.request({
      url: app.config.host + 'token',
      method:'POST',
      data : {
        appid:1001,
        timestamp:timestamp,
        sign: that.createSign()
      },
      success:function(res){
        console.log(res)
        if(res.data.errNo == 200){
          that.login(res.data.data.token)
        }else{
          wx.showToast({
            title: res.data.errMsg,
          })
        }
      }
    })
  },

  /**
   * 调用登录接口
   */
  login:function(token){
    var that = this
    wx.request({
      url: app.config.host + 'login',
      method:'POST',
      data:{
        mobile: this.data.account,
        password: this.data.password,
        token:token,
        type: this.data.currentTab  ,//用户类型 0 用户 1商户
      },
      success:function(res){
        console.log(res)
        if (res.data.errNo == 200) {
          wx.hideLoading()
          app.globalData.userId = res.data.data.userId
          wx.setStorage({
            key: 'account',
            data: that.data.account,
          })
          wx.setStorage({
            key: 'password',
            data: that.data.password,
          }),
            wx.reLaunch({
              url: '../homepage/homepage',
            })
        } else {
          wx.showToast({
            title: res.data.errMsg,
          })
        }
      }
    })
  },
  /**
   * 生成签名
   */
  createSign : function(e){
    var timestamp = Date.parse(new Date()); 
    var str = 'appid' + 1001 + 'timestamp' + timestamp + '8ce97edbaa944e8f8b99beaf728a0bbf'
    return utilMd5.hexMD5(str)
  }
})


