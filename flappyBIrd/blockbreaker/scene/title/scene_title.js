
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

        // 添加结束游戏的 modal
        this.modal = Modal.new(game)
        this.addElement(this.modal)
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
        if(this.f.life == -1) {
            // 小鸟生命值为 0, 设置model, 显示最终分数
            return
        }
        super.update()
    }
}
