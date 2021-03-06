var loadLevel = function(game) {
    var level = levels[0]
    // 现在循环加入三个砖块
    var blocks = []
    for(var i = 0; i < level.length; i++){
        var p = level[i]
        var block = Block(game, p)
        blocks.push(block)
    }
    return blocks
}
    var blocks = []
var enableDebugMode = function(game, enable) {
  if(!enable){
    return
  }
  window.paused = false
  window.addEventListener('keydown', function(event) {
    var k = event.key
    if(k == 'p'){
      // 暂停功能
        paused = !paused
    }else if ('123456789'.includes(k)) {
      // 暂时为了 debug 临时加入关卡功能
        log('k',k)
        levels = []
        length = k * 2
        window.fps = length * 3
        var m = []
        for(var i = 1; i <= length; i ++){
            var mathX = Math.random(0, i) * 150
            var mathY = Math.random(0, i) * 200
            m.push([mathX, mathY, 1])
        }
        levels.push(m)
      blocks = loadLevel(game, Number(k))
    }
  })
  // 控制速度
  document.querySelector('#id-input-speed').addEventListener('input', function(event) {
    var value = event.target.value
    window.fps = Number(value)
  })
}
var  __main = function() {
    var images = {
        bg: 'img/bg.png',
        block: 'img/block.png',
        ball: 'img/ball.png',
        paddle: 'img/paddle.png',
    }
    var game = Game.instance(30, images, function(g) {
        var s = SceneTitle.new(g)
        g.runWithScene(s)
        // var ball = Ball(game)
        // var paddle = Paddle(game)
        // var paused = false
        // var score = 0
        // game.registerAction('a', function() {
        //     paddle.moveLeft()
        // })
        //
        // game.registerAction('d', function() {
        //     paddle.moveRight()
        // })
        // game.registerAction('f', function() {
        //     ball.fire()
        // })
        // game.update = function() {
        //     if(window.paused){
        //         return
        //     }
        //     ball.move()
        //     if (paddle.collide(ball)) {
        //         // 这里应该调用一个 ball.反弹() 来实现
        //         ball.rebound()
        //     }
        //     // 这里需要判断 block 和 ball 是否相交
        //     for(var i = 0; i < blocks.length; i++){
        //         var block = blocks[i]
        //         if(block.collide(ball)) {
        //             block.kill()
        //             ball.rebound()
        //             score += 100
        //         }
        //     }
        // }
        //
        // var enableDrage = false
        // game.canvas.addEventListener('mousedown', function(event) {
        //     // 在点击的时候判断是不是点击到那个物体,即判断 x y 是不是在点击的矩形里面
        //     var x = event.offsetX
        //     var y = event.offsetY
        //     log(ball)
        //     if(ball.hasPoint(x, y)){
        //         // 点击的是我们的目标物体
        //         enableDrage = true
        //     }
        // })
        // game.canvas.addEventListener('mousemove', function(event) {
        //     var x = event.offsetX
        //     var y = event.offsetY
        //     if(enableDrage){
        //         ball.x = x
        //         ball.y = y
        //     }
        // })
        // game.canvas.addEventListener('mouseup', function(event) {
        //     enableDrage = false
        // })df
        // game.draw = function() {
        //     // draw 背景
        //     game.context.fillStyle = "#554"
        //     game.context.fillRect(0, 0, 500, 300)
        //
        //     game.drawImage(paddle)
        //     game.drawImage(ball)
        //     for(var i = 0; i < blocks.length; i++){
        //         var block = blocks[i]
        //         if(block.alive) {
        //             game.drawImage(block)
        //         }
        //     }
        //     game.context.fillText('分数：' + score, 10, 290);
        // }

    })

    enableDebugMode(game, true)

}

__main()
