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
