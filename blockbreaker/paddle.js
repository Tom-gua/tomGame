var Paddle = function() {
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        speed: 10,
    }
    o.moveLeft = function() {
        if(o.x < 0){
          o.x = 0
        }
        o.x -= o.speed
    }
    o.moveRight = function() {
        if(o.x > 500-o.image.width){
          o.x = 500-o.image.width
        }
        o.x += o.speed
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    return o
}
