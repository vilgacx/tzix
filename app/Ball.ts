type BallType = {
  r: number,
  x: number,
  y: number,
  mass: number,
  prev_x: number,
  prev_y: number,
  delta: {
    x: number,
    y: number
  },
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

        ball.delta.x = (ball.x - ball.prev_x) * 0.01;
        ball.delta.y = (ball.y - ball.prev_y) * 0.01;
      });
    }
  }

  CreateBall(r: number, x: number, y: number, mass: number) {
    this.balls.push({ r, x, y, prev_x: x, prev_y: y, mass: mass, delta: { x: 0, y: 0 }, hold_delta: 0 });
  }

  private Collision(ball: BallType, index: number) {
    const { r, x, y, mass } = ball;

    this.balls.forEach((other_ball, other_index) => {

      if (index !== other_index) {
        if (Math.pow(other_ball.x - x, 2) + Math.pow(other_ball.y - y, 2) <= Math.pow(r + other_ball.r, 2)) {

          const mass_eq = (2 * other_ball.mass) / (mass + other_ball.mass);

          ball.delta.x = ball.delta.x + (mass_eq * (other_ball.delta.x - ball.delta.x));
          ball.delta.y = ball.delta.y + (mass_eq * (other_ball.delta.y - ball.delta.y));
        }

      }

    })

    if (x + r > this.w || x - r < 0) {
      ball.delta.x *= -1;
    }

    if (y + r > this.h || y - r < 0) {
      ball.delta.y *= -1;
    }

  }

  private MoveBalls() {
    this.balls.forEach((ball, index) => {

      this.Collision(ball, index);

      if (!this.DetectBall(ball.r, ball.x, ball.y) && !this.hold) {
        ball.x += ball.delta.x;
        ball.y += ball.delta.y;
      }
    });
  }
}

export default Ball;
