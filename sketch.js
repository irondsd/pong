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

function Scores() {
    textSize(25)
    text(scoreAI, 20, 40)
    text(scorePlayer, 20, height - 20)
}
