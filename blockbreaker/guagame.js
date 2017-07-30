var Game = function(fps, images, runCallback) {
  // 我们希望某个键位在按下时执行一段代码
  var g = {
    scene: null,
    actions:{},
    keydowns: {},
    images: {},
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
  g.update = function() {
      g.scene.update()
  }
  g.draw = function() {
      g.scene.draw()
  }
    var loads = []
    // 加载图片资源，加载了之后，才能运行run
    var names = Object.keys(images)
    for(var i = 0; i < names.length; i++){
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 存入 g.images 中
            g.images[name] = img
            // 所有图片都成功载入之后, 调用 run
            loads.push(1)
            // log('load images', loads.length, names.length)
            if (loads.length == names.length) {
                log('load images', g.images)
                g.run()
            }
        }
    }
  g.imageByName = function(name) {
      var img = g.images[name]
      var image = {
        w: img.width,
        h: img.height,
        image: img,
      }
      return image
  }
    g.runWithScene = function(scene) {
        // 切换场景
        g.scene = scene
        // 开始运行程序
        setTimeout(function() {
            runloop()
        }, 1000/fps)
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
        // log('触发')
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
  g.run = function() {
      // log('开始运行程序')
      runCallback(g)
  }
  return g
}
