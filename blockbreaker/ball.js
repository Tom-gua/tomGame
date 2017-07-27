var Ball = function() {
    var image = imageFromPath('ball.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 10,
        speedY: 10,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if(o.fired) {
            if (o.x < 0 || o.x > 500) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.rebound = function() {
      o.speedY *= -1
    }
    return o
}
