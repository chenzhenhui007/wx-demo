//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    longitude:"121.86932",
    latitude:"29.47665",
    timer:0
  },
  //控件点击绑定
  bindcontroltap:function(e){
    console.log(e)
    //事件id，switch语句区分功能
    switch(e.controlId){
      case 1:  this.mapctx.moveToLocation();break;
      //是否已在骑行
       case 2: console.log(this.timer); this.timer? (wx.navigateBack({
         delta: 1
       }) ) : (wx.scanCode({
         success:()=>{
           wx.showLoading({
             title: '正在开锁...',
           });
          
          wx.request({
            //请求服务器url资源
            url: 'https://www.easy-mock.com/mock/5921aa889aba4141cf295dd5/ofo/password',
            success:(res)=>{
              wx.hideLoading()
              wx.redirectTo({
                url: '../go/go',
                // success:()=>{
                // }
              })
            }
          })
        }
      }))

    }
  },

  movetoCenter:function(){
    this.mapctx.moveToLocation()
  },

  onLoad: function (options) {
    //页面间数据交互
    console.log(this.options.timer)
    this.timer = options.timer
    //获取当前位置
    wx.getLocation({
      success: (res)=> {
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude,
        })
      },
    })

    //定位图标
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls:[{
            id:1,
            iconPath:"../images/location.png",
            position:{
              width:50,
              height:50,
              left:30 ,
              top:res.windowHeight - 80
            },clickable:true
          },{
            id:2,
            iconPath:"../images/use.png",
            position:{
              width:90,
              height:90,
              left:res.windowWidth/2 - 45,
              top: res.windowHeight - 120
              }, clickable: true
            }, {
              id: 3,
              iconPath: "../images/warn.png",
              position: {
                width: 50,
                height: 50,
                left: res.windowWidth - 80,
                top: res.windowHeight - 80
              }, clickable: true
            }, {
              id: 4,
              iconPath: "../images/avatar.png",
              position: {
                width: 40,
                height: 40,
                left: res.windowWidth - 75,
                top: res.windowHeight - 165
              }, clickable: true
            }, {
              id: 5,
              iconPath: "../images/marker.png",
              position: {
                width: 30,
                height: 45,
                left: res.windowWidth/2 - 15,
                top: res.windowHeight/2 - 45
              }, clickable: true
            }]
        })
      },
    })
   },
   //周期-展示
 onShow: function (){
   //创建map执行期上下文
   this.mapctx = wx.createMapContext("ofo-map")
   this.mapctx.moveToLocation()
 },
 onReady:function(){
   
   
 },onHide:function(){
   console.log('hide')
   
 },
 onUnload:function(){
   
   if(this.data.sumT !== '0s'){
     console.log('end')
      

     
   }
 }
 
})
