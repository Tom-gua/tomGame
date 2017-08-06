class GuaLabel {
  constructor(game, text) {
    this.game = game
    this.text = text
  }
  static new(game, text) {
    log(name, text)
    return new this(game, text)
  }
  draw() {
    this.game.context.fillText(this.text, 100, 190)
  }
  update() {

  }
}


class GuaParticle extends GuaImage{
  constructor(game) {
    super(game, 'fire')
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
  }
  update() {
    this.life--
    this.x += this.vx
    this.y += this.vy
    var s = 0.5
    this.vx += s * this.vx
    this.vy += s * this.vy
  }
}

class GuaParticleSystems {
  constructor(game) {
    this.game = game
    this.setup()
  }
  setup() {
    this.duration = 60
    this.x = 150
    this.y = 200
    this.numberOfParticles = 20
    this.particles = []
  }
  static new(game) {
    return new this(game)
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
      var p = GuaParticle.new(this.game)
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
