class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 100
        this.管子横向间距 = 200
        this.pipeIntialX = 400
        this.columsOfpipe = 3
        for (var i = 0; i < this.columsOfpipe; i++) {
            var p1 = GuaImage.new(game, 'tube2')
            p1.flipY = true
            p1.x = this.pipeIntialX + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'tube2')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    debuger() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipeSpace.value
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-280, 10)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        var pipes = this.pipes
        for (var i = 0; i < pipes.length / 2; i += 2) {
            var p1 = pipes[i]
            var p2 = pipes[i+1]
            p1.x -= 1
            p2.x -= 1
            if(p1.x < -50) {
                log('触发1', this.管子横向间距)
                p1.x += this.管子横向间距 * this.columsOfpipe
            }
            if(p2.x < -50) {
                log('触发2', this.管子横向间距)
                p2.x += this.管子横向间距 * this.columsOfpipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)


            context.restore()
        }
    }
}

class Grounds {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.grounds = []
        this.skipCount = 5
        for (var i = 0; i < 2; i++) {
            var ground = GuaImage.new(this.game, 'ground')
            ground.x = i * 310
            ground.y = 340
            this.ground = ground
            this.grounds.push(ground)
        }
    }
    static new(game) {
        return new this(game)
    }
    update() {
        this.skipCount--
        var offSet = 5
        if(this.skipCount == 0) {
            this.skipCount = 5
            offSet = -20
        }
        // 移动地面
        for (var g of this.grounds) {
            g.x -= offSet
        }
    }
    draw(){
        for(var g of this.grounds) {
            this.game.drawImage(g)
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var f = Flappy.new(game)
        this.f = f
        var bg = GuaImage.new(game, 'bg')
        bg.w = 600
        bg.h = 350
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 添加地面
        this.ground = Grounds.new(game)
        this.addElement(this.ground)
        this.addElement(f)

        this.setupInputs()
    }
    // update() {
    //     super.update()
    // }
    // draw() {
    //     // draw labels
    //     this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function(keyStatus) {
            self.f.move(-2, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            self.f.move(2, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            self.f.jump()
        })
    }
}