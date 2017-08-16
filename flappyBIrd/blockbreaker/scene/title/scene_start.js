/**
 * Created by tom on 2017/8/16.
 */
// class StartImage extends GuaImage {
//     constructor(game, name) {
//         super(game, name)
//     }
//
// }
class StartFlappy extends GuaAnimation{
    constructor(game) {
        super(game)
        this.setup()
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
}

class SceneStart extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        var game = this.game
        this.title = GuaImage.new(this.game, 'title')
        var x = this.game.context.canvas.clientWidth / 2 - this.title.w / 2
        var y = this.game.context.canvas.clientHeight / 2 - this.title.h - 100
        this.title.x = x
        this.title.y = y
        this.addElement(this.title)
        this.bird = StartFlappy.new(this.game)
        this.bird.x = this.game.context.canvas.clientWidth / 2 - 20
        this.bird.y = this.game.context.canvas.clientHeight / 2 - 20
        this.addElement(this.bird)
        game.registerAction('k', function(){
            // 按下了按钮之后显示倒计时之后切换场景
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    drawText(font, style, text, x, y) {
        var context = this.game.context
        context.font=font;
        context.fillStyle = style;
        context.fillText(text, x, y)
    }
    draw() {
        // draw labels
        super.draw()
        this.drawText("20px Arial", "black",'按 k 开始游戏 p 为切换暂停键位 J为跳跃键位', this.title.x - 100,  this.title.y + 250)
    }
}
