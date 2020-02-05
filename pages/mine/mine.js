// pages/mine/mine.js
const app = getApp()
const baseApi = 'user/userInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestApi();
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
  goRealAuth: function() {
    if (this.data.userInfo.isRealAuth !== 1) {
      wx.reLaunch({
        url: 'setting/realuth',
      })
    }
  },
  setUserInfo: function (data) {
    this.setData({
      userInfo: data.data
    });
  },
  requestApi: function () {
    this.curl(baseApi, {
      uToken: app.globalData.token,
    }, this.setUserInfo);
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
          console.error(res)
        }
      }
    })
  }
})