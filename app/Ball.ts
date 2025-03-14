type BallType = {
  r: number,
  x: number,
  y: number,
  prev_x: number,
  prev_y: number,
  delta_x: number,
  delta_y: number,
  hold_delta: number
}

type BallsArray = BallType[];

class Ball {
  t: number;

  w: number;
  h: number;
  ctx: CanvasRenderingContext2D;
  balls: BallsArray;

  hold: Boolean;

  mx: number;
  my: number;

  acc: number;

  fric: number;

  constructor(w: number, h: number, ctx: CanvasRenderingContext2D) {
    this.t = 0;

    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.balls = [];

    this.hold = false;

    this.mx = 0;
    this.my = 0;

    this.acc = 2;
    this.fric = 0.95;

    setInterval(() => {
      this.t += 1;
    }, 1000);

    setInterval(() => {
      this.MoveBalls();
    }, 10);

    const MainLoop = () => {
      ctx.clearRect(0, 0, w, h);
      this.CreateBalls();
      this.DetectBalls();

      requestAnimationFrame(() => MainLoop());
    }

    MainLoop();
  }

  private CreateBalls() {
    this.balls.forEach((ball) => {
      let { r, x, y } = ball;

      x = (x - r < 0) ? (r + 2) : ((x + r > this.w) ? (this.w - r - 2) : x);
      y = (y - r < 0) ? (r + 2) : ((y + r > this.h) ? (this.h - r - 2) : y);

      this.ctx.beginPath();
      this.ctx.arc(x, y, 50, 0, Math.PI * 2);
      this.ctx.fillStyle = "#7e22ce";
      this.ctx.fill();
    });
  }

  private DetectBall(r: number, x: number, y: number) {
    return (Math.pow(this.mx - x, 2) + Math.pow(this.my - y, 2)) < (r * r)
  }

  private DetectBalls() {
    if (this.hold) {
      this.balls.forEach((ball) => {
        const { r, x, y } = ball;

        if (this.DetectBall(r, x, y)) {

          if (ball.hold_delta === this.t) {
            ball.prev_x = ball.x;
            ball.prev_y = ball.y;
          }

          ball.x = this.mx;
          ball.y = this.my;

        }

        ball.hold_delta = this.t + 1;

        ball.delta_x = (ball.x - ball.prev_x) * 0.01;
        ball.delta_y = (ball.y - ball.prev_y) * 0.01;
      });
    }
  }

  CreateBall(r: number, x: number, y: number) {
    this.balls.push({ r, x, y, prev_x: x, prev_y: y, delta_x: 0, delta_y: 0, hold_delta: 0 });
  }

  private Collision(ball: BallType, index: number) {
    const { r, x, y } = ball;

    if (x + r > this.w || x - r < 0) {
      ball.delta_x *= -1;
    }

    if (y + r > this.h || y - r < 0) {
      ball.delta_y *= -1;
    }

    this.balls.forEach((ball_b, index_b) => {
      if (index !== index_b) {
        const d = Math.pow(ball_b.x - x, 2) + Math.pow(ball_b.y - y, 2);
        if (d <= Math.pow(r + ball_b.r, 2)) {
          console.log("collison")
        }
      }
    })

  }
  private MoveBalls() {
    this.balls.forEach((ball, index) => {

      this.Collision(ball, index);

      if (!this.DetectBall(ball.r, ball.x, ball.y) && !this.hold) {
        ball.x += ball.delta_x;
        ball.y += ball.delta_y;
      }
    });
  }
}

export default Ball;
