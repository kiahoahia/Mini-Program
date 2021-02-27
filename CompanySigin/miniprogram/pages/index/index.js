//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
   banner:[],
   functionui:[],
  },

  onLoad: function() {
    let that = this
    db.collection('banner').get({
       success:res=>{
         console.log('图片获取成功',res)
         that.setData({
           banner:res.data
         })
       }
     })
    //  db.collection('functionui').get({
    //    success:fun=>{
    //      console.log('ui图片获取成功',fun)
    //      that.setData({
    //        functionui:fun.data 
    //      })
    //    }
    //  })
    },
  })

   