/**
 * Created by wafer on 2017/8/1.
 */
var Bg = function(game) {
    var o = game.imageByName('bg')
    o.x = 0
    o.y = 0
    o.w = game.canvas.width
    o.h = game.canvas.height
    // o.fire = function() {
    //     o.fired = true
    // }
    // o.move = function() {
    //     if(o.fired) {
    //         if (o.x < 0 || o.x > 500) {
    //             o.speedX = -o.speedX
    //         }
    //         if (o.y < 0 || o.y > 300) {
    //             o.speedY = -o.speedY
    //         }
    //         // move
    //         o.x += o.speedX
    //         o.y += o.speedY
    //     }
    // }
    // o.rebound = function() {
    //     o.speedY *= -1
    // }
    // o.hasPoint = function(x, y) {
    //     var xIn = x > o.x && x < o.x + o.w
    //     var yIn = y > o.y && y < o.y + o.h
    //     return xIn && yIn
    // }
    return o
}
