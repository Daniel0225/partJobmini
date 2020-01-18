// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [{
      id: 0,
      iconPath: "../../images/icon_location_s.png",
      latitude: 23.099994,
      longitude: 113.324520,
      width: 22,
      height: 30
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      latitude : parseFloat(options.latitude),
      longitude : parseFloat(options.longitude),
      markers: [{
        latitude: parseFloat(options.latitude),
        longitude: parseFloat(options.longitude),
      }]
    })
    // this.data.latitude = parseFloat(options.latitude),
    //   this.data.longitude = parseFloat(options.longitude)
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

  }
})