// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedDate: `${(new Date()).getFullYear()}-${(new Date()).getMonth() < 9 ? '0' : ''}${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`
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
  onDayClick: function (event) {
    console.log(event.detail)
    wx.showToast({
      title: '日期被点击，具体信息请看Console信息',
      icon: 'none'
    })
  },
  onMonthChange: function (event) {
    console.log(event.detail)
  },
  formatDate: function (time) {
    var d = new Date(time);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
  }
})