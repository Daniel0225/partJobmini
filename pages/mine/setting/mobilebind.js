// pages/mine/setting/mobilebind.js
const app = getApp()
const defaultUserId = '0000000000000000'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleText: '手机绑定',
    btnText: '提交',
    sendCodeText: '获取验证码',
    mobile: '',
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type === '1') {// 系统设置-修改手机绑定
      this.setData({ type: options.type })
      if (app.globalData.userId !== defaultUserId) {
        this.setData({ titleText: '修改手机绑定' })
      }
    } else if (options.type === '2') {

    } else {

    }
  },
  mobileInput: function (e) {
    this.data.mobile = e.detail.value
  },
  codeInput: function (e) {
    this.data.code = e.detail.value
  },
  submitEvn: function () {
    const $this = this
    if ($this.validate(1) !== 0) {
      return
    }
    const params = { 
      uToken: app.globalData.token,
      mobile: $this.data.mobile,
      code: $this.data.code
    }
    let api = 'miniprogram/bindMobile'
    let title = '绑定成功'
    let dumpPage = '../mine'
    if ($this.data.type === '1') {
      if (app.globalData.userId !== defaultUserId) {
        api = 'user/updMobile'
        title = '换绑成功'
      } else {
        api = 'miniprogram/bindMobile'
      }
    }
    $this.curl(api, params, function () {
      wx.showToast({
        title,
        complete: function() {
          if (api === 'miniprogram/bindMobile') {
            app.wxLogin(function() {
              wx.reLaunch({
                url: dumpPage,
              })
            })
          } else {
            wx.reLaunch({
              url: dumpPage,
            })
          }
        }
      })
    })
  },
  sendCode: function() {
    const $this = this
    if ($this.validate(0) !== 0) {
      return
    }
    if ($this.data.sendCodeText === '获取验证码') {
      $this.apiGetToken($this.apiSendCode)
    }
  },
  validate: function(type) {
    const $this = this
    var errNo = 0
    if ($this.data.mobile === '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1500
      })
      errNo ++
    }
    if (type === 1) {
      if (errNo === 0 && $this.data.code === '') {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 1500
        })
        errNo ++
      }
    }
    return errNo;
  },
  apiSendCode: function(data) {
    const $this = this
    const params = { mobile: $this.data.mobile, token: data.data.token}
    $this.curl('user/sendCode', params, function() {
      $this.sendCodetip(60)
    })
  },
  apiGetToken: function (successFn) {
    const $this = this
    const timestamp = Date.parse(new Date())
    $this.curl('token', {
      appid: app.config.appid,
      timestamp,
      sign: app.createSign()
    }, successFn)
  },
  sendCodetip: function(num) {
    num --
    if (num > 0) {
      const sendCodeText = `${num}S`
      this.setData({ sendCodeText })
      const $this = this;
      setTimeout(function () { $this.sendCodetip(num) }, 1000)
    } else {
      const sendCodeText = '获取验证码'
      this.setData({ sendCodeText })
    }
  },
  curl: function (api, data, successFn, method = 'POST') {
    wx.showLoading({
      title: '正在请求',
    })
    wx.request({
      url: `${app.config.host}${api}`,
      method,
      data,
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.errNo === 200) {
          successFn(res.data);
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.errMsg,
            showCancel: false
          })
          console.error(res)
        }
      }
    })
  }
})