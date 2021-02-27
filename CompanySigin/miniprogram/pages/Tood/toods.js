// pages/Tood/toods.js、
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    contents:'',
    date:'',
    time:'',
    toods:[]
  },
  //删除数据
  toodsdel:function(e){
    let that = this
     //{index: '0',  id: 'abcd'}
    //  console.log(e.target.dataset.index)
    //  console.log(e.target.dataset.id)
  //  this.data.toods.splice(e.target.dataset.index,1)
     db.collection('toods').doc(e.target.dataset.id).remove({
         sucess:res=>{
            let toods=this.data.toods.splice(e.target.dataset.index,1)
            console.log('删除成功',res)
            that.setData({
             toods:toods
            })
            this.onShow()
         },fail:res=>{
           console.log('删除失败')
         }
        })
  },
//查询记事本数据
selectToods:function(e){
   let that = this
   db.collection('toods').get({
    sucess:res=>{
       console.log("日报信息获取成功",res)
       that.setData({
         toods:res.data,
       })
      
     },fail:res=>{
       console.log("日报信息获取失败",res)
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
    let that = this
    db.collection('toods').get({
      success:res=>{
        console.log('日报获取成功',res)
        that.setData({
          toods:res.data,
        })
      },fail:res=>{
        console.log('日报获取失败',res)
      }
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
    wx.offAccelerometerChange()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this
    db.collection('toods').get({
      success:res=>{
        console.log('日报获取成功',res)
        that.setData({
          toods:res.data,
        })
      },fail:res=>{
        console.log('日报获取失败',res)
      }
    }) //在标题栏中显示加载

    //模拟加载
    
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