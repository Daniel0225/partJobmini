// pages/mine/setting/mobilebind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleText: '手机绑定',
    btnText: '提交',
    sendCodeText: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  sendCode: function() {
    if (this.data.sendCodeText === '获取验证码') {
      this.sendCodetip(60)
    }
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
  }
})