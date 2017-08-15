/**
 * Created by tom on 2017/8/15.
 */
class Modal {
    constructor(game) {
        this.game = game
        this.text = ''
        this.life = -1
        this.bg = GuaImage.new(this.game, 'modalbg')
        this.bg.x = 200
        this.bg.y = 100
        this.bg.w = 200
        this.bg.h = 200
    }
    draw() {
        var context = this.game.context
        if(this.life < 0) {
            return
        }
        this.bg.draw()
        context.drawImage(255, 255, 255, 100)
        context.fillText(this.text, 100, 290)
    }
    static new(game){
        return new this(game)
    }
    update(){
        log(this.game)
        if(this.game.scene.f.life < 0) {
            this.life = 100
            this.text = '游戏结束'
        }
    }
}