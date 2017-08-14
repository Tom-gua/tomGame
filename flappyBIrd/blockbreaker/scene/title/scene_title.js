



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
