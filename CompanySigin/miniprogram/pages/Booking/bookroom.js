// pages/Booking/bookroom.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meeting_room:[]

  },
  //跳转页面
  yuyue:function(e){
   console.log(e)
    wx.navigateTo({
      url: '../meeting/meetingroom'
    })
  },
//预览图片

img:function(e){

  let that = this
  wx.previewImage({
    urls: ['cloud://kiahiahoa-4gvusjebfa839977.6b69-kiahiahoa-4gvusjebfa839977-1304487626/MeetingRooms/meetingroom2.jpg','cloud://kiahiahoa-4gvusjebfa839977.6b69-kiahiahoa-4gvusjebfa839977-1304487626/MeetingRooms/meetingroom3.jpg'],
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('meeting_room').get({
      success:res=>{
        console.log('会议室获取成功',res)
        that.setData({
          meeting_room:res.data
        })
      },fail:res=>{
        console.log('会议室获取失败',res)
      }
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