/**
 * Created by liteng on 2017/7/29.
 */
 const config = {
   player_speed : 10,
   bullet_speed: 3,
   enemy_speed: 2,
 }

class Bullet extends GuaImage {
     constructor(game) {
         super(game, 'bullet')
         this.setup()
     }
     setup() {
         this.speed = 3
     }
     update() {
       this.y -= this.speed
     }
     debuger() {
       this.speed = config.bullet_speed
     }
 }
class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
    }
    update() {
        if(this.cooldown > 0) {
            this.cooldown--
        }
    }
    debuger() {
      this.speed = config.player_speed
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    fire() {
        if(this.cooldown === 0) {
            this.cooldown = 10
            var x = this.x + this.w / 2.8
            var y = this. y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y - 5
            this.scene.addElement(b)
        }

    }
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n)
}

class Enemy extends GuaImage {
    constructor(game) {
        super(game, 'enemy')
        // var type = randomBetween(0, 4)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if(this.y > 600) {
            this.setup()
        }
    }
    debuger(){
      this.speed = config.enemy_speed
    }
    // moveDown() {
    //     this.y += this.speed
    // }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')
        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 400
        this.player.w = 100
        this.player.h = 100

        this.addElement(this.bg)
        this.addElement(this.player)
        // this.elements = []
        // this.elements.push(this.bg)
        // this.elements.push(this.player)
        this.addEnemies()
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            e.w = 60
            e.h = 60
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        this.game.registerAction('a', () => {
            this.player.moveLeft()
        })

        this.game.registerAction('d', () => {
            this.player.moveRight()
        })
        this.game.registerAction('w', () => {
            this.player.moveUp()
        })
        this.game.registerAction('s', () => {
            this.player.moveDown()
        })
        this.game.registerAction('f', () => {
            this.player.fire()
        })
    }
    update() {
      super.update()
    }
}


// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     var ball = Ball(game)
//     var paddle = Paddle(game)
//     // var paused = false
//     var score = 0
//     game.registerAction('a', function() {
//         paddle.moveLeft()
//     })
//
//     game.registerAction('d', function() {
//         paddle.moveRight()
//     })
//     game.registerAction('f', function() {
//         ball.fire()
//     })
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 1000, 500)
//
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         for(var i = 0; i < blocks.length; i++){
//             var block = blocks[i]
//             if(block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         game.context.fillText('分数：' + score, 10, 290);
//     }
//     s.update = function() {
//         if(window.paused){
//             return
//         }
//         ball.move()
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.rebound()
//         }
//         if(ball.y > paddle.y){
//             var s = SceneEnd.new(game)
//             game.runWithScene(s)
//         }
//
//         // 这里需要判断 block 和 ball 是否相交
//         for(var i = 0; i < blocks.length; i++){
//             var block = blocks[i]
//             if(block.collide(ball)) {
//                 block.kill()
//                 ball.rebound()
//                 score += 100
//             }
//         }
//     }
//     var enableDrage = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         // 在点击的时候判断是不是点击到那个物体,即判断 x y 是不是在点击的矩形里面
//         var x = event.offsetX
//         var y = event.offsetY
//         log(ball)
//         if(ball.hasPoint(x, y)){
//             // 点击的是我们的目标物体
//             enableDrage = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         if(enableDrage){
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         enableDrage = false
//     })
//     return s
// }
