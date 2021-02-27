// pages/Login/login.js
var app = getApp();
const db= wx.cloud.database();
const admin= db.collection('Users');
let name=null;
let password=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:''
  },
  jump:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  passwordInput:function(e){
    this.setData({
     password:e.detail.value
    })
  },
  onLogin:function(e){
    let that = this
    console.log(this.data.name+this.data.password)
    admin.get({
      success: (res) => {
        let user = res.data;
        console.log(res.data)
        for (let i=0;i<user.length;i++) {  
          if (this.data.name === user[i].userNa){ 
            if (this.data.password !== user[i].userPa) {  
              wx.showToast({
                title: '密码错误！！',
                icon: 'success',
                duration: 2500
              })
            } else {
              console.log('登陆成功！')  
              wx.showToast({
                title: '登陆成功！！',
                icon: 'success',
                duration: 2500,
              }) 
              wx.switchTab({
                url: "/pages/index/index",
              })
              app.globalData.nowuserropid=app.globalData.openids
            }
          } 
        }
      }
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

  },
  register(){
    wx.navigateTo({
      url: '/pages/Register/register',
    })
  }
})
