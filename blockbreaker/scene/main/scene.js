/**
 * Created by liteng on 2017/7/29.
 */
const config = {
    player_speed: 10,
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
        this.life = 100
    }

    update() {
        if(this.life > 0) {
            this.blast()
            this.y -= this.speed
        }
    }

    debuger() {
        this.speed = config.bullet_speed
    }

    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }

    collide(o, ball) {
        // log('ball',ball)
        // if (ball.y + ball.image.height > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.image.width) {
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        var aInb = this.aInb
        if(aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if(aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }

    blast() {
        var game = this.game
        var die = []
        this.scene.enemies.forEach((item, index) => {
            if(this.collide(item, this)) {
                // 需要在碰撞处加载粒子效果
                this.scene.particleSystems = GuaParticleSystems.new(game, this.x, this.y)
                this.scene.addElement(this.scene.particleSystems)

                // 子弹和飞机消失
                item.life = 0
                this.life = 0
                // 粒子效果持续几秒后消失
               die.push(index)
            }
        })
    }

    // blast() {
    //     var game = this.game
    //     this.scene.enemies.forEach((item, index) => {
    //         if(item.y + item.h - this.y === 0) {
    //             // 需要在碰撞处加载粒子效果
    //             this.scene.particleSystems = GuaParticleSystems.new(game, this.x, this.y)
    //             this.scene.addElement(this.scene.particleSystems)
    //             // 子弹和飞机消失
    //             item.life = 0
    //             this.life = 0
    //             this.scene.enemies.splice(index, 0)
    //         }
    //     })
    // }
}
class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 10
        this.cooldown = 0
        this.life = 100
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
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y - 5
            this.scene.addElement(b)
        }
    }
}


class Enemy extends GuaImage {
    constructor(game) {
        super(game, 'enemy')
        // var type = randomBetween(0, 4)
        this.setup()
    }

    setup() {
        this.life = 100
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.y += this.speed
        if(this.y > 600) {
            this.setup()
            this.scene.enemies.push(this)
        }
    }

    debuger() {
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
        for(var i = 0; i < this.numberOfEnemies; i++) {
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
    removeEnemies() {
        // 从数组中删除已经爆炸的敌机
        this.enemies = this.enemies.filter(item => item.life == 100)
    }
    update() {
        this.removeEnemies()
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
