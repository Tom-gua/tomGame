var Game = function(ftps) {
  // 我们希望某个键位在按下时执行一段代码
  var g = {
    actions:{},
    keydowns: {},
  }
  var canvas = document.querySelector('#id-canvas')
  var context = canvas.getContext('2d')
  g.canvas = canvas
  g.context = context
  // events
  window.addEventListener('keydown', function(event) {
    g.keydowns[event.key] = true
  })
  window.addEventListener('keyup', function(event) {
    g.keydowns[event.key] = false
  })

  g.registerAction = function(key, callback) {
    g.actions[key] = callback
  }
  g.drawImage = function(guaImage) {
    g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
  }
  window.fps = 30
  var runloop = function() {
    // events
    var actions = Object.keys(g.actions)
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i]
      if(g.keydowns[key]){
        // 如果按键被按下，调用注册的 action
        g.actions[key]()
        log('触发')
      }
    }
    // update
    g.update()
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height)
    //draw
    g.draw()
    //next runloop
    setTimeout(function() {
      runloop()
    }, 1000/window.fps)
  }
  setTimeout(function() {
    runloop()
  }, 1000/fps)

  return g
}
