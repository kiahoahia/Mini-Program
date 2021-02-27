// pages/meeting/meetingroom.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room_name: "",
    year: 0,
    month:0,
    day:0,
    meeting_num:0,
    meeting:[],
    start_time:0,
    end_time:0,
    departement_name:'技术部',
    time:[{name:9,yemian:"9:00"},{name:10,yemian:"10:00"},{name:11,yemian:"11:00"},{name:12,yemian:"12:00"},{name:13,yemian:"13:00"},{name:14,yemian:"14:00"},{name:15,yemian:"15:00"},{name:16,yemian:"16:00"},{name:17,yemian:"17:00"},{name:18,yemian:"18:00"}],
    departement:["技术部","运营部","财务部","人事部","董事会"]
  },
  //提交会议预约
  submit:function(e){
    let that= this
    if(that.data.start_time<that.data.end_time){
      if(that.data.meeting.length>=0){
        db.collection('meeting').add({
          data:{
            room_name: that.data.room_name,
            year: that.data.year,
            month:that.data.month,
            day:that.data.day,
            start_time:that.data.start_time,
            end_time:that.data.end_time,
            departement_name: that.data.departement_name,
            state:"审核中",
            state_color:"#1380f7"
    
          },success:res=>{
            console.log('会议提交成功',res)
            wx.showToast({
              title: '预约成功',
               success:res=>{
                 wx.navigateBack({
                   delta: 1,
                 })
              }
            })
            
          },fail:res=>{
            console.log('会议提交失败',res)
          }
        })
      }else{
        for(var i=0;i<=that.data.meeting.length;i++){
          if(that.data.meeting[i].start_time<=that.data.start_time&&that.data.meeting[i].end_time>=that.data.start_time){
            wx.showToast({
              title: '你选择的时间有误',
              icon:'none'
            })       
        }else{
          that.setData({
            end_time:that.data.time[e.detail.value].name
          })
        }
      }
        for(var i=0;i<=that.data.meeting.length;i++){
          if(that.data.meeting[i].start_time<=that.data.start_time&&that.data.meeting[i].end_time>=that.data.start_time){
            wx.showToast({
              title: '你选择的时间有误',
              icon:'none'
            })       
        }else{
          that.setData({
            end_time:that.data.time[e.detail.value].name
          })
        }
      }
      }   
    }else{
      wx.showToast({
        title: '你选择的时间有误',
        icon:'none'
      })       
    }
    
    
  },
  //选择预约部门
  departement:function(e){
    let that =  this
    console.log('选择部门',that.data.departement[e.detail.value])
    that.setData({
      departement_name:that.data.departement[e.detail.value]
    })
  },
  //选择开始日期
  start_time:function(e){
    let that = this
    console.log('选择开始的时间是',that.data.time[e.detail.value].name)
    if(that.data.meeting.length>=0){
      that.setData({
        start_time:that.data.time[e.detail.value].name
      })
    }else{
      for(var i=0;i<=that.data.meeting.length;i++){
        if(that.data.meeting[i].start_time<=that.data.time[e.detail.value].name&&that.data.meeting[i].end_time>=that.data.time[e.detail.value].name){
          wx.showToast({
            title: '你选择的时间有误',
            icon:'none'
          })       
      }else{
        that.setData({
          start_time:that.data.time[e.detail.value].name
        })
      }
    }
    }
  },
  //选择结束时间
  end_time:function(e){
    let that = this
    console.log('选择结束的时间是',that.data.time[e.detail.value].name)
    if(that.data.start_time<that.data.time[e.detail.value].name){
      if(that.data.meeting.length>=0){
        that.setData({
          end_time:that.data.time[e.detail.value].name
        })
      }else{
        for(var i=0;i<=that.data.meeting.length;i++){
          if(that.data.meeting[i].start_time<=that.data.time[e.detail.value].name&&that.data.meeting[i].end_time>=that.data.time[e.detail.value].name){
            wx.showToast({
              title: '你选择的时间有误',
              icon:'none'
            })       
        }else{
          that.setData({
            end_time:that.data.time[e.detail.value].name
          })
        }
      }
      }
    }else{
      wx.showToast({
        title: '你选择的时间有误',
        icon:'none'
      })       
    }
    
  },
  //选择日期
  date:function(e){
    let that = this
    console.log(e)
    let ar=[]
    const date_y = e.detail.value
    ar=date_y.split("-");
    that.setData({
      year:parseInt(ar[0]),
      month:parseInt(ar[1]),
      day:parseInt(ar[2]),
    })
    that.select_meeting()
    console.log(that.data.year,that.data.month,that.data.day)
  },
  //查询当前日期的预约会议
  select_meeting: function (e) {
    let that = this
    db.collection('meeting').where({
      year: that.data.year,
      month: that.data.month,
      day: that.data.day
    }).get({
      success:res=>{
        console.log('会议获取成功',res.data.length)
        that.setData({
          meeting_num:res.data.length,
          meeting:res.data
        })
      },fail:res=>{
        console.log('会议获取失败',res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let time = new Date()
    console.log(time)
    that.setData({
      room_name: options.room_name,
      year: time.getFullYear(),
      month: time.getMonth() + 1,
      day: time.getDate(),
    })
    that.select_meeting()
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