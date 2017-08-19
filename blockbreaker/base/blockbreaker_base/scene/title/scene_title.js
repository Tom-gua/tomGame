class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.setup()
    }

    setup() {
        var game = this.game
        game.registerAction('k', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })
        game.registerAction('e', function() {
            var s = SceneEdit.new(game)
            game.replaceScene(s)
        })

    }

    draw() {
        // draw labels
        this.game.context.fillText('按 k 开始游戏', 100, 150)
        this.game.context.fillText('按 e 开始编辑', 100, 200)
    }
}

class SceneEdit extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.setup()
    }

    drawText(font, style, text, x, y) {
        var context = this.game.context
        context.font = font;
        context.fillStyle = style;
        context.fillText(text, x, y)
    }

    setup() {
        this.indexCondition = -1
        this.editIndex = 0
        this.edit = true
        this.isPoint = false
        this.position = []
        this.add = false
        this.currenBlocks = []
        this.bg = Bg(this.game)
        this.balls = []
        for(var i = 1; i < 9; i++) {
            var o = this.game.imageByName(`${i}`)
            o.x = i * 40 + 20
            o.y = 200
            o.w = 30
            o.h = 30
            o.hasPoint = function(x, y, item) {
                var o = item
                if(y > o.y && y < o.y + 30) {
                    if(x > o.x && x < o.x + 30) {
                        return true
                    }
                }
            }
            this.balls.push(o)
        }
        var self = this
        this.game.canvas.addEventListener('mouseup', (event) => {
            // 在点击的时候判断是不是点击到那个物体,即判断 x y 是不是在点击的矩形里面
            var x = event.clientX
            var y = event.clientY
            // 点击的时候判断该位置存在不存在砖块
            if(this.indexCondition === -1) {
                self.balls.forEach((item, index) => {
                    if(item.hasPoint(x, y, item)) {
                        // 点击的是我们的目标物体
                        self.editIndex = index
                        self.edit = false
                        self.indexCondition = 2
                        var s = localStorage.leve ? JSON.parse(localStorage.leve) : []
                        var arr = s[index] || []
                        arr.forEach((item) => {
                            var block = Block(this.game, item)
                            block.w = 20
                            block.h = 20
                            this.currenBlocks.push(block)
                        })
                    }
                })
            } else {
                this.p = [x - 20, y - 20]
                this.currenBlocks.forEach((block, index) => {
                    if(block && block.hasPoint(x, y, block)) {
                        // 删除掉这个block
                        this.currenBlocks.splice(index, 1)
                        this.add = true
                    }else {
                        this.add = false
                    }
                })
                // 根据 block 的 edit 来查找
                if(!this.add) {
                    // 生成一个block
                    var block = Block(this.game, this.p)
                    block.w = 20
                    block.h = 20
                    this.currenBlocks.push(block)
                }
            }
        })

        this.game.registerAction('s', function() {
            // 需要存储数据到localStorage中
            var a  = []
            self.currenBlocks.forEach((item) => {
                a.push([item.x, item.y])
            })
            var l = self.editIndex
            window.leve = localStorage.leve ? JSON.parse(localStorage.leve) : []
            window.leve[l] = a
            localStorage.leve = JSON.stringify(window.leve)
        })
    }

    draw() {
        this.game.drawImage(this.bg)

        if(this.edit) {
            this.balls.forEach((item) => {
                this.game.drawImage(item)
            })
            this.drawText("20px Arial", "green", `请选择编辑的关卡：`, 100, 100)
            this.drawText("20px Arial", "green", `(确认成功编辑之后按 s 保存)`, 100, 150)
            this.drawText("20px Arial", "green", `(按 k 开始游戏， 切换关卡按键为 1-8 )`, 100, 180)
        } else {
            this.balls[this.editIndex].x = 460
            this.balls[this.editIndex].y = 10
            this.game.drawImage(this.balls[this.editIndex])
            this.currenBlocks.forEach((item) => {
                this.game.drawImage(item)
            })
        }
    }

    update() {
        super.update()
    }
}
