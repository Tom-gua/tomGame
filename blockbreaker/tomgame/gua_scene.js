/**
 * Created by wafer on 2017/7/31.
 */
class GuaScene {
    constructor(game) {
       this.game = game
       this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    draw(){
      for (var i = 0; i < this.elements.length; i++) {
        var e = this.elements[i]
        this.game.drawImage(e)
      }
    }
    addElement(guaImage) {
      this.elements.push(guaImage)
    }
    update(){

    }
}
