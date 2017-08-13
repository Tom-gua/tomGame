class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        log(game)
        // var label = GuaLabel.new(game, 'hello')
        // this.addElement(label)
        var w = GuaAnimation.new(game)
        this.w = w
        var back = GuaImage.new(game, 'cover')
        back.w = 1000
        back.h = 400
        this.addElement(back)
        w.x = 300
        w.y = 200
        this.addElement(w)

        this.setupInputs()
    }
    // draw() {
    //     // draw labels
    //     this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function(keyStatus) {
            self.w.move(-2, keyStatus)

        })
        self.game.registerAction('d', function(keyStatus) {
            self.w.move(2, keyStatus)
        })
    }
}
