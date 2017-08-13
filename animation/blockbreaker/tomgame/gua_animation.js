class GuaAnimation {
  constructor(game) {
      this.game = game
      this.animations = {
          normal: [],
          run: [],
      }
      for (var i = 1; i < 7; i++) {
          var name = `w${i}`
          var t = game.textureByName(name)
          this.animations[`normal`].push(t)
      }

      for (var i = 1; i < 10; i++) {
          var name = `r${i}`
          var t = game.textureByName(name)
          this.animations[`run`].push(t)
      }
      this.animationName = 'normal'
      this.texture = this.frames()[0]
      this.frameIndex = 0
      this.frameCount = 3
      this.w = this.texture.width
      this.h = this.texture.height
      this.flipX = false
  }
  frames() {
      return this.animations[this.animationName]
  }
  static new(game) {
      return new this(game)
  }
  draw() {
      var context = this.game.context
      if(this.flipX) {
          context.save()
          var x = this.x + this.w / 2
          context.translate(x, 0)
          context.scale(-1, 1)
          context.drawImage(this.texture, -x, this.y)
          context.restore()
      }else {
          context.drawImage(this.texture, this.x, this.y)
      }
  }
  update() {
      this.frameCount--
      if(this.frameCount === 0) {
          this.frameCount = 3
          this.frameIndex = (this.frameIndex + 1) % this.frames().length
          this.texture = this.frames()[this.frameIndex]
      }
  }
  changeAnimationName(name) {
      this.animationName = name
  }
  move(x, keyStatus) {
      this.flipX = x < 0
      this.x += x
      var animationNames = {
          down: 'run',
          up: 'normal',
      }
      var name = animationNames[keyStatus]

      this.changeAnimationName(name)
    //   if(keyStatus === 'down') {
    //       this.changeAnimationName('run')
    //   }else if (keyStatus === 'up') {
    //       this.changeAnimationName('normal')
    //   }
  }
}
