// pages/Toodsadd/toodsadd.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:"",
      contents:"",
      time:"",
      hour :"",
      month :"",
      secound :"",
      day:"",
      minute:"",
      toods:[]
  },
  //拿到标题内容
titleInput:function(e){
  this.setData({
    title:e.detail.value
  })
},
contentsInput:function(e){
  this.setData({
    contents:e.detail.value
  })
},
  //添加内容到数据库
toodsadd:function(e){
  let that= this
  console.log("标题："+this.data.title+"内容："+this.data.contents)
  if(this.data.title!=0 &&　this.data.contents!=0){
    let time = new Date() 
    let year = time.getFullYear()
    let hour = time.getHours() 
    let month = time.getMonth()+1
    let secound = time.getSeconds()
    let day = time.getDate()
    let minute = time.getMinutes()
    db.collection('toods').add({
      data:{
        title:this.data.title,
        contents:this.data.contents,
        date:year+'-'+month+'-'+day,
        time:hour+':'+minute+':'+secound,
      },success:res=> {
        console.log('日志添加成功',res)
        let toods= this.data.toods
        that.setData({
          toods:res.data
        })
        wx.showToast({
          title: '日志添加成功',
        })
        
      },
    })
  }else{
    wx.showToast({
      title: '请检查内容',
    })
  }
  
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