// pages/workinfo/workinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workBean:"",
    signStatus:"立即报名"
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
            workBean:res.data.data,
          })
          if(that.data.workBean.orderStatus == 0){
            that.setData({
              signStatus:"取消报名"
            })
          }
        }else{

        }
      }
    })
  },
  toMap:function(e){
    wx.navigateTo({
      url: '../../pages/map/map?latitude=' + this.data.workBean.latitude + '&longitude=' + this.data.workBean.longitude,
    })
  },
  /**
   * 签到
   */
  signInClick:function(e){
    if(this.data.workBean.orderStatus == 0){
        this.signIn()
    }else{
      wx.showToast({
        title: '此状态无法签到',
        mask: true,
      })
    }
  },
  /**
   * 签退
   */
  signBackClick: function (e) {
    if (this.data.workBean.orderStatus == 4 || this.data.workBean.orderStatus == 3) {
      this.signBack()
    } else {
      wx.showToast({
        title: '此状态无法签退',
        mask: true,
      })
    }
  },
  /**
   * 报名
   */
  signUpClick: function (e) {
    if (this.data.workBean.orderStatus == -1 || this.data.workBean.orderStatus == 1) {
      this.signUp()
    } else if (this.data.workBean.orderStatus == 0){
      this.cancelOrder()
    } else {
      wx.showToast({
        title: '当前工单状态无法报名',
        mask: true,
      })
    }
  },

/**
 * 签到接口
 */
  signIn:function(e){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.config.host + 'order/workStart',
      method: 'POST',
      data: {
        uToken: app.globalData.token,
        orderId: this.data.workBean.orderId
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.errNo == 200) {
          if(res.data.data.errNo == 0){
            wx.showToast({
              title: '已签到',
              mask: true,
            })
            let temp = 'workBean.orderStatus'
            that.setData({
              [temp]: 2
            })
          }else{
            wx.showToast({
              title: res.data.data.errMsg,
              mask: true,
            })
          }
          
        } else {
          wx.showToast({
            title: res.data.errMsg,
            mask: true,
          })
        }
      }
    })
  },
  /**
 * 签退接口
 */
  signBack: function (e) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.config.host + 'order/workEnd',
      method: 'POST',
      data: {
        uToken: app.globalData.token,
        orderId: this.data.workBean.orderId
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.errNo == 200) {
          if (res.data.data.errNo == 0) {
            wx.showToast({
              title: '已签退',
              mask: true,
            })
            let temp = 'workBean.orderStatus'
            that.setData({
              [temp]: 4
            })
          } else {
            wx.showToast({
              title: res.data.data.errMsg,
              mask: true,
            })
          }
          
        } else {
          wx.showToast({
            title: res.data.errMsg,
            mask: true,
          })
        }
      }
    })
  },
  /**
 * 报名接口
 */
  signUp: function (e) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.config.host + 'order/create',
      method: 'POST',
      data: {
        uToken: app.globalData.token,
        workId: this.data.workBean.id
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)

        if (res.data.errNo == 200) {
          if (res.data.data.errNo == 0) {
            wx.showToast({
              title: '已报名',
              mask: true,
            })
            let temp = 'workBean.orderStatus'
            that.setData({
              signStatus: "取消报名",
              [temp]: 0
            })
        
          } else {
            wx.showToast({
              title: res.data.data.errMsg,
              mask: true,
            })
          }
        } else {
          wx.showToast({
            title: res.data.errMsg,
            mask: true,
          })
        }
      }
    })
  },
  /**
 * 取消报名接口
 */
  cancelOrder: function (e) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.config.host + 'order/cancel',
      method: 'POST',
      data: {
        uToken: app.globalData.token,
        orderId: this.data.workBean.orderId
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.errNo == 200) {

          if (res.data.data.errNo == 0) {
            wx.showToast({
              title: '已取消报名',
              mask: true,
            })
            let temp = 'workBean.orderStatus'
            that.setData({
              signStatus: "立即报名",
              [temp]:1
            })
          } else {
            wx.showToast({
              title: res.data.data.errMsg,
              mask: true,
            })
          }
        } else {
          wx.showToast({
            title: res.data.errMsg,
            mask: true,
          })
        }
      }
    })
  },
})