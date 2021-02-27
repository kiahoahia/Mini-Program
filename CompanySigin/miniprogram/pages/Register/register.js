// pages/Register/register.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    userpassword:''
  },
usernameInput:function(e) {
  this.setData({
    username:e.detail.value
  })
},
userpasswordInput:function(e){
  this.setData({
    userpassword:e.detail.value
  })
},

  onRegister: function () {
    let that = this
    console.log("用户名："+this.data.username+"密码："+this.data.userpassword)
    db.collection('Users').add({
      data:{
        userNa:this.data.username,
        userPa:this.data.userpassword
      }
    })
    
  },
  login(){
    wx.navigateTo({
      url: '/pages/Login/login',
    })
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

  }
})