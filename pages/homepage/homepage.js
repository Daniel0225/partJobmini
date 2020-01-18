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
    items:[],
    isEmpty:false//是否显示空提示
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
      if (this.data.currentTab == 0){
        this.getCollectWork()
      }else{
        this.getWorks()
      }
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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
        if(res.data.errNo == 200){
          that.setData({
            items: res.data.data.list,
            isEmpty:res.data.data.list.length == 0
          })
        }else{

        }
      }
    })
  },

  /**
   * 获取收藏列表
   */
  getCollectWork:function(e){
    var that = this;
    var location = this.data.location.split(",")
    wx.showLoading({
      title: '正在请求',
    })
    wx.request({
      url: app.config.host + 'user/workCollectList',
      method: 'POST',
      data: {
        uToken: app.globalData.token,
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.errNo == 200) {
          that.setData({
            items: res.data.data.list,
            isEmpty: res.data.data.list.length == 0
          })
        } else {

        }
      }
    })
  },

  /**
   * 收藏按钮点击
   */
  clickCollect:function(e){
    console.log(e.currentTarget.dataset.position)
    let temp = 'items[' + e.currentTarget.dataset.position + '].isCollect'
    let isCollect = this.data.items[e.currentTarget.dataset.position].isCollect
    this.setData({
      [temp]: isCollect == 0 ? 1 : 0
    })
    this.isCollect(this.data.items[e.currentTarget.dataset.position])
  },
  /**
   * 收藏和 取消收藏
   */
  isCollect:function(e){
    var that = this
    wx.request({
      url: app.config.host + 'user/workCollect',
      method: 'POST',
      data:{
        uToken:app.globalData.token,
        workId:e.id,
        status:e.isCollect == 0 ? 1 : 0
      },
      success:function(res){
        console.log(res)
      },
    })
  },
  toDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../../pages/workinfo/workinfo?workId='+e.currentTarget.dataset.id,
    })
  }
})