// pages/mine/setting/realuth.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  nameInput: function (e) {
    this.data.name = e.detail.value
  },

  idcardNoInput: function (e) {
    this.data.cardNo = e.detail.value
  },
  submitEve: function() {
    const {name, cardNo} = this.data
    const params = { uToken: app.globalData.token, name, cardNo }
    this.curl('realAuth', params, function() {
      wx.showToast({
        title: '认证成功',
        icon: 'success',
        mask: true,
        complete: function() {
          wx.reLaunch({
            url: '../mine',
          })
        }
      })
    })
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