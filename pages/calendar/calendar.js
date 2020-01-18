// pages/calendar/calendar.js
const app = getApp()
const baseApi = 'user/myWorks';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cuDate = new Date();
    const selectedDate = `${cuDate.getFullYear()}-${cuDate.getMonth() < 9 ? '0' : ''}${cuDate.getMonth() + 1}-${cuDate.getDate()}`;
    this.setData({selectedDate})
    this.requestApi(selectedDate)
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
  onDayClick: function (event) {
    this.requestApi(event.detail.id)
  },
  onMonthChange: function (event) {
    const selectedDate = this.formatDate(event.detail);
    this.setData({ selectedDate })
    this.requestApi(selectedDate);
  },
  formatDate: function (time) {
    var d = new Date(time);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
  },
  showWork: function(data) {
    this.setData({
      items: data.data.list
    });
  },
  requestApi: function(date) {
    this.curl(baseApi, {
      uToken: app.globalData.token,
      startDate: date,
      endDate: date
    }, this.showWork);
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