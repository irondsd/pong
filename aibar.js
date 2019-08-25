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
