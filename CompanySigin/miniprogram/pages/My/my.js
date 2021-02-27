// pages/My/my.js
var app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haslogin:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  jump01:function(){
    wx.navigateTo({
      url: '/pages/Sigin-record/sigin-record'
    })
  },
  jump02:function(){
    wx.navigateTo({
      url: '/pages/Login/login'
    })
  },
  jump03:function(){
    wx.navigateTo({
      url: '/pages/Register/register'
    })
  },
  jump04:function(){
    wx.navigateTo({
      url: '/pages/myteam/team'
    })
  },
  jump05:function(){
    wx.navigateTo({
      url: '/pages/Login/login',
    })
  },
  onLoad: function (options) {
    let that =this
    console.log(app.globalData.nowuserropid)
    that.setData({
      haslogin:app.globalData.nowuserropid,
    })
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
    let that =this
    console.log(app.globalData.nowuserropid)
    that.setData({
      haslogin:app.globalData.nowuserropid,
    })
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
    let that =this
    console.log(app.globalData.nowuserropid)
    that.setData({
      haslogin:app.globalData.nowuserropid,
    })
    setTimeout(function()
    
    {
    // complete
    
    wx.hideNavigationBarLoading() //完成停止加载
    
    wx.stopPullDownRefresh() //停止下拉刷新
    
    },1500);
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