/**
 * Created by tom on 2017/8/16.
 */
class SceneStart extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 k 开始游戏', 100, 290)
    }
}
