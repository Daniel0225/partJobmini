// pages/homepage/homepage.js
const app = getApp()
var amapFile = require('../../utils/amap-wx.js');//如：..­/..­/libs/amap-wx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    poiName:'定位中...',
    location:"",
    items:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key:'ab3fe4ccba6bfbdca5bb35ddf049adfe'});
   
    myAmapFun.getPoiAround({
     
      querytypes : '120200|100100|080300',
      
      success:function(data){
        console.log(data)
        that.setData({
          poiName:data.poisData[0].name,
          location: data.poisData[0].location,
        })
        that.getWorks()
      },
      fail:function(info){
        console.log(info)
      }
    });
    /**
        * 获取当前设备的宽高
        */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
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

  //  tab切换逻辑
    swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 获取附近的任务列表
   */
  getWorks:function(e){
    var that = this;
    var location = this.data.location.split(",")
    wx.showLoading({
      title: '正在请求',
    })
    wx.request({
      url: app.config.host + 'user/works',
      method: 'POST',
      data: {
        uToken: app.globalData.token,
        latitude: parseFloat(location[1]),
        longitude: parseFloat(location[0])
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        that.setData({
          items:res.data.data.list
        })
      }
    })
  }
})