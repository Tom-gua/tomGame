class GuaLabel {
  constructor(game, text) {
    this.game = game
    this.text = text
  }
  static new(game, text) {
    return new this(game, text)
  }
  draw() {
    var g = this.game.context
    g.fillStyle = "lightgreen"
    g.font = "30px Arial"
    if(this.scene.player.life <  20) {
      g.fillStyle = "tomato"
    }
    g.fillText(this.text, 120, 570)
  }
  update() {
    this.text = `生命值: ${this.scene.player.life}`
  }
}


class GuaParticle extends GuaImage{
  constructor(game, name) {
    super(game, name)
    this.game = game
    this.setup()
  }
  setup() {
    this.life = 10
  }
  init(x, y ,vx, vy) {
    this.x = x
    this.y = y
    this.vy = vy
    this.vx = vx
    this.w = 60
    this.h = 60
  }
  update() {
    this.life--
    this.x += this.vx
    this.y += this.vy
    var s = 0.001
    this.vx += s * this.vx
    this.vy += s * this.vy
  }
}

class GuaParticleSystems {
  constructor(game, x, y, name) {
    this.game = game
    this.names = name
    log(game,x, y, name)
      this.x = x
      this.y = y
    this.setup()
  }
  setup() {
    this.life = 100
    this.duration = 20
    this.numberOfParticles = 20
    this.particles = []
  }
  static new(game, x, y, name) {
    return new this(game, x, y, name)
  }
  draw() {
      if(this.duration < 0){
      //TODO, 这是一个临时的方案，应该从 scene 中删除自己才对
      return
    }
    for(var p of this.particles) {
      p.draw()
    }
  }
  update() {
    this.duration--
    // 添加小火花
    if(this.particles.length < this.numberOfParticles) {
      var p = GuaParticle.new(this.game, this.names)
      // 设置初始化坐标
      var s = 2
      var vx = randomBetween(-s, s)
      var vy = randomBetween(-s, s)
      p.init(this.x, this.y, vx, vy)
      this.particles.push(p)
    }

    // 更新所有的小火花
    for(var p of this.particles) {
      p.update()
    }
    // 删除死掉的小火花
    this.particles = this.particles.filter(p => p.life > 0)
  }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // log(game)
        // var label = GuaLabel.new(game, 'hello')
        // this.addElement(label)

        var ps = GuaParticleSystems.new(game)
        this.addElement(ps)
    }
    // draw() {
    //     // draw labels
    //     this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
}
