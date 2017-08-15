
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
        this.beginGame = true
        this.setup()
        // 添加开始按钮
        this.start = StartButton.new(game, 'start')
        this.addElement(this.start)

        // 添加结束按钮
        this.pause = PauseButton.new(game, 'pause')
        this.addElement(this.pause)
    }
    setup() {
        var self = this
        self.game.registerAction('p', function(keyStatus) {
            if(keyStatus === 'up') {
                self.beginGame = !self.beginGame
            }
        })
    }
    update() {
        this.start.update()
        this.pause.update()
        if(this.beginGame) {
            return
        }
        super.update()
    }
}
