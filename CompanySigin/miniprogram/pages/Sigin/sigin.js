// pages/Sigin/sigin.js
var QQmaker = require('../../util/qqmap-wx-jssdk.min');
var qqmapsdk;
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    markers:[],
    province:"",
    city:"",
    county:"",
    add:""
  },

  sign_in: function () {
    if (this.data.latitude!=0) {
      let that = this
      wx.showLoading({
        title: '签到中',
      })
      let time = new Date() 
      let year = time.getFullYear()
      let hour = time.getHours() 
      let month = time.getMonth()+1
      let secound = time.getSeconds()
      let day = time.getDate()
      let minute = time.getMinutes()
      if(hour<8){
        that.setData({
          sign_in_state:"未迟到"
        })
      }else{
        that.setData({
          sign_in_state:"你已经迟到了"
        })
      }
      db.collection('sign_in').add({
        data:{
          latitude:that.data.latitude,
          longitude:that.data.longitude,
          date:year+'-'+month+'-'+day,
          time:hour+':'+minute+':'+secound,
          sign_in_state:that.data.sign_in_state,
          province:this.data.province,
          city:this.data.city,
          address:this.data.address
        },success:res=> {
          console.log('签到成功',res)
          wx.showToast({
            title: '签到成功',
          })
        },
      })
    }else{
      wx.showToast({
        title: '请获取当前位置',
        icon:'none',
      })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //KHSBZ-JIECP-XKIDG-LKY6K-JUU5E-AMFBZ
    qqmapsdk = new QQmaker({
            key: 'KHSBZ-JIECP-XKIDG-LKY6K-JUU5E-AMFBZ'
          });
  },
  getLocation: function(e) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      altitude:true,
      success:res=> {   
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          }, success: function(res){
                console.log(res)
              that.setData({
              latitude: res.result.location.lat,
              longitude: res.result.location.lng,
              province:res.result.address_component.province,
              city:res.result.address_component.city,
              address:res.result.address,
              markers:[{
                    iconPath: "../../images/markers.png",
                    id:0,
                    longitude:res.result.location.lng,
                    latitude: res.result.location.lat,
                    width:50,
                    height:50
                  }]
            })
            }, fail: function(err) {
                      console.log("传递数据有误",err)
                      
               }
          // location: e.detail.value.reverseGeo || '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
        })
        
      }
    })
  },
        // this.setData({
        //   latitude:res.latitude,
        //   longitude:res.longitude,
        //   markers:[{
        //     iconPath: "../../images/markers.png",
        //     id:0,
        //     longitude:res.longitude,
        //     latitude:res.latitude,
        //     width:50,
        //     height:50
        //   }]
        // })

 
  
   

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