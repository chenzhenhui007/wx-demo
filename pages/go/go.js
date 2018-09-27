Page({
  data: {
    h:0,
    m:0,
    s:0
  },
  end:function(){
    clearInterval(this.timer)
    wx.redirectTo({
      url: '../index/index',
    })
  },
  back: function (e) {
    console.log(this.timer)
    wx.navigateTo({
      url: '../index/index?timer='+this.timer
    })
  },
  time:function(){
    let s=0
    let m=0
    let h=0
      this.timer = setInterval(()=>{
       this.setData({
         s:s++
       })
        if (s == 60) {
          s = 0
          m++
          setTimeout(() => {
            this.setData({ m: m })
          }, 1000)
          if (m == 60) {
            m = 0
            h++
            setTimeout(() => {
              this.setData({ h: h })
            }, 1000)
          }
        }
      },1000)
       
        
        
      },
  onLoad: function (options) {
     this.time()
    console.log(options.sumT)
    if(options.sumT){
       this.setData({
         sumT: options.sumT
       })
     }
   
  },
  onShow:function(){
    
  },
  onReady:function(){
    
  },
  onUnload:function(){
     
  }
})
