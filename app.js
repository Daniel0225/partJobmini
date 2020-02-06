//app.js
const utilMd5 = require('utils/MD5.js')
App({
  config: {
    appid: 1002,
    secret: '2ad6a6927456476b6dcbfaf4e1eb42a3',
    host: 'http://106.13.38.140:7001/' // 这个地方填写你的域名
  },
  onLaunch: function () {
    const that = this
    // 登录
    that.wxLogin()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  wxLogin: function () {
    var that = this
    wx.login({
      success: res => {
        that.getToken(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  getToken: function (code) {
    var that = this
    var timestamp = Date.parse(new Date());
    wx.showLoading({
      title: '正在登录',
    })
    wx.request({
      url: that.config.host + 'token',
      method: 'POST',
      data: {
        appid: that.config.appid,
        timestamp: timestamp,
        sign: that.createSign()
      },
      success: function (res) {
        console.log(res)
        if (res.data.errNo == 200) {
          that.login(res.data.data.token, code)
        } else {
          wx.showToast({
            title: res.data.errMsg,
          })
        }
      },
      fail: function (e) {

      }
    })
  },
  login: function (token, code) {
    var that = this
    wx.request({
      url: that.config.host + 'miniprogram/authcode2Session',
      method: 'POST',
      data: {
        token,
        code
      },
      success: function (res) {
        console.log(res)
        if (res.data.errNo == 200) {
          that.globalData.openid = res.data.data.openid
          that.globalData.token = res.data.data.uToken
          that.globalData.userId = res.data.data.userId
        } else {
          wx.showToast({
            title: res.data.errMsg,
          })
        }
      },
      fail: function (e) {

      }
    })

  },
  /**
   * 生成签名
   */
  createSign: function (e) {
    var timestamp = Date.parse(new Date());
    var str = 'appid' + this.config.appid + 'timestamp' + timestamp + this.config.secret
    return utilMd5.hexMD5(str)
  },
  globalData: {
    userInfo: null,
    openid: "",
    userId: "",
    token:""
  }
})