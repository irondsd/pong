var ball
var bar
var aibar
var playing = false
var scoreAI = 0
var scorePlayer = 0

function setup() {
    createCanvas(500, 750)
    ball = new Ball()
    bar = new Bar()
    aibar = new Aibar()
}

function draw() {
    background(0)

    if (keyIsDown(LEFT_ARROW)) {
        bar.left()
    }
    if (keyIsDown(RIGHT_ARROW)) {
        bar.right()
    }

    if (keyIsDown(32)) {
        playing = true
    }

    bar.reflects(ball)
    aibar.reflects(ball)
    ai(ball, aibar)
    aibar.update()
    bar.update()
    aibar.show()
    bar.show()

    if (playing) ball.update()
    ball.show()

    Scores()
}

function ai(ball, aibar) {
    if (ball.x > aibar.x + 40) {
        aibar.right()
    }
    if (ball.x < aibar.x + 40) {
        aibar.left()
    }
}

function Ball() {
    this.radius = 10

    this.show = function() {
        fill(255)
        ellipse(this.x, this.y, this.radius, this.radius)
    }

    this.initialVelocity = function() {
        this.velocityY = Math.floor(Math.random() * (5 + 5 + 1) - 5)
        this.velocityX = Math.floor(Math.random() * (4 - 7 + 1) + 7)

        if (Math.random() > 0.5) this.velocityX *= -1
    }

    this.initialPosition = function() {
        this.x = width / 2
        this.y = height / 2
    }

    this.initialPosition()
    this.initialVelocity()

    this.update = function() {
        this.y -= this.velocityX
        this.x -= this.velocityY

        this.walls()
    }

    this.walls = function() {
        if (this.x <= 0) {
            this.x = 0
            this.velocityY = this.velocityY * -1
        }

        if (this.x >= width) {
            this.x = width
            this.velocityY = this.velocityY * -1
        }

        if (this.y >= height + 20) {
            playing = false
            this.initialVelocity()
            this.initialPosition()
            scorePlayer += 1
            console.log('player lost, ', scorePlayer)
        }

        if (this.y <= -20) {
            playing = false
            this.initialVelocity()
            this.initialPosition()
            scoreAI += 1
            console.log('ai lost, ', scoreAI)
        }
    }
}

function Bar() {
    this.width = 80
    this.height = 10
    this.x = width / 2 - this.width / 2
    this.y = height - 10
    this.velocity = 0
    this.drag = 0.5
    this.maxSpeed = 11

    this.show = function() {
        fill(255)
        rect(this.x, this.y, this.width, this.height)
    }

    this.update = function() {
        this.x += this.velocity

        if (this.velocity > 0) {
            this.velocity -= this.drag
        }
        if (this.velocity < 0) {
            this.velocity += this.drag
        }

        if (abs(this.velocity) < this.drag) {
            this.velocity = 0
        }

        if (this.velocity >= this.maxSpeed) {
            this.velocity = this.maxSpeed
        }

        if (this.velocity * -1 >= this.maxSpeed) {
            this.velocity = this.maxSpeed * -1
        }

        if (this.x < 0) {
            this.x = 0
            this.velocity = 0
        }

        if (this.x + this.width > width) {
            this.x = width - this.width
            this.velocity = 0
        }
    }

    this.left = function() {
        if (this.velocity > 0) {
            this.velocity = 0
        }

        this.velocity -= 1
    }

    this.right = function() {
        if (this.velocity < 0) {
            this.velocity = 0
        }

        this.velocity += 1
    }

    this.reflects = function(ball) {
        if (ball.x >= this.x && ball.x <= this.x + this.width && ball.y >= this.y && ball.y <= this.y + 100) {
            let angleReflection = (ball.x - (this.x + this.width / 2)) * -0.05
            ball.velocityX = ball.velocityX * -1 * 1.1
            ball.velocityY = (ball.velocityY + angleReflection) * 1.1
        }
    }
}

function Aibar() {
    this.width = 80
    this.height = 10
    this.x = width / 2 - this.width / 2
    this.y = 0
    this.velocity = 0
    this.drag = 0.5
    this.maxSpeed = 11

    this.show = function() {
        fill(255)
        rect(this.x, this.y, this.width, this.height)
    }

    this.update = function() {
        this.x += this.velocity

        if (this.velocity > 0) {
            this.velocity -= this.drag
        }
        if (this.velocity < 0) {
            this.velocity += this.drag
        }

        if (abs(this.velocity) < this.drag) {
            this.velocity = 0
        }

        if (this.velocity >= this.maxSpeed) {
            this.velocity = this.maxSpeed
        }

        if (this.velocity * -1 >= this.maxSpeed) {
            this.velocity = this.maxSpeed * -1
        }

        if (this.x < 0) {
            this.x = 0
            this.velocity = 0
        }

        if (this.x + this.width > width) {
            this.x = width - this.width
            this.velocity = 0
        }
    }

    this.left = function() {
        if (this.velocity > 0) {
            this.velocity = 0
        }

        this.velocity -= 1
    }

    this.right = function() {
        if (this.velocity < 0) {
            this.velocity = 0
        }

        this.velocity += 1
    }

    this.reflects = function(ball) {
        if (ball.x >= this.x && ball.x <= this.x + this.width && ball.y >= this.y - 90 && ball.y <= this.y + 10) {
            let angleReflection = (ball.x - (this.x + this.width / 2)) * -0.05
            ball.velocityX = ball.velocityX * -1 * 1.1
            ball.velocityY = (ball.velocityY + angleReflection) * 1.1
        }
    }
}

function Scores() {
    textSize(25)
    text(scoreAI, 20, 40)
    text(scorePlayer, 20, height - 20)
}
