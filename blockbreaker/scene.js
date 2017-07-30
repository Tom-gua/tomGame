/**
 * Created by liteng on 2017/7/29.
 */
var Scene = function(game) {
    var s = {
        game: game,
    }
    var ball = Ball(game)
    var paddle = Paddle(game)
    // var paused = false
    var score = 0
    game.registerAction('a', function() {
        paddle.moveLeft()
    })

    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })
    s.draw = function() {
        // draw 背景
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 500, 300)

        game.drawImage(paddle)
        game.drawImage(ball)
        for(var i = 0; i < blocks.length; i++){
            var block = blocks[i]
            if(block.alive) {
                game.drawImage(block)
            }
        }
        game.context.fillText('分数：' + score, 10, 290);
    }
    s.update = function() {
        if(window.paused){
            return
        }
        ball.move()
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.rebound()
        }

        // 这里需要判断 block 和 ball 是否相交
        for(var i = 0; i < blocks.length; i++){
            var block = blocks[i]
            if(block.collide(ball)) {
                block.kill()
                ball.rebound()
                score += 100
            }
        }
    }
    var enableDrage = false
    game.canvas.addEventListener('mousedown', function(event) {
        // 在点击的时候判断是不是点击到那个物体,即判断 x y 是不是在点击的矩形里面
        var x = event.offsetX
        var y = event.offsetY
        log(ball)
        if(ball.hasPoint(x, y)){
            // 点击的是我们的目标物体
            enableDrage = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        if(enableDrage){
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        enableDrage = false
    })
    return s
}
