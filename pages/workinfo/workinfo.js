// pages/workinfo/workinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workBean:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      this.getWorkDetail(options.workId)
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

  /**
   * 获取岗位详情
   */
  getWorkDetail:function(e){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.config.host + 'user/workInfo',
      method:'POST',
      data:{
        uToken: app.globalData.token,
        id:e
      },
      success:function(res){
        wx.hideLoading()
        console.log(res)
        if(res.data.errNo == 200){
          that.setData({
            workBean:res.data.data
          })
        }else{

        }
      }
    })
  }
})