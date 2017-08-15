class Flappy extends GuaAnimation {
    constructor(game) {
        super(game)
        this.game = game
        // 重力和加速度
        this.gy = 10
        this.vy = 0
        this.y = 100
        this.x = 120
        this.rotation = 0
        this.flippySpeed = 2

        this.setup()
        this.setupInputs()
    }
    setup() {
        this.addAnimationType('bird')
        for (var i = 1; i < 4; i++) {
            var name = `bird${i}`
            var t = this.game.textureByName(name)
            this.changeAnimationItem('bird', t)
        }
        this.changeAnimationName('bird')
        this.setTexture()
    }
    // draw() {
    //
    // }
    update() {
        super.update()
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.05
        var h = 312
        if(this.y > h) {
            this.y = h
        }
        // 更新角度
        if(this.rotation < 45) {
            this.rotation += 5
        }
    }
    debuger() {
        this.flippySpeed = config.flippySpeed.value
        // this.flippyX = config.flippyX.value
        // this.flippyY = config.flippyY.value
    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function(keyStatus) {
            self.move(-self.flippySpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            self.move(self.flippySpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            self.jump()
        })
    }
    jump() {
        this.vy = -10 * 0.5
        this.rotation = -45
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
    }
}
