type BallsArray = Array<{r: number, x: number, y: number}>;

class Ball {
  w: number;
  h: number;
  ctx: CanvasRenderingContext2D;
  balls: BallsArray;

  mx: number;
  my: number;
  
  constructor(w: number, h: number, ctx: CanvasRenderingContext2D) {
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.balls = [];

    this.mx = 0;
    this.my = 0;

    const MainLoop = () => {
      ctx.clearRect(0, 0, w, h);
      this.CreateBalls();
      this.DetectBalls();
      requestAnimationFrame(() => MainLoop());
    }
    requestAnimationFrame(() => MainLoop()); 
  }

  private CreateBalls() {
    this.balls.forEach((ball) => {
      let { r, x, y } = ball;

      x = (x - r < 0) ? (r + 2) : ((x + r > this.w) ? (this.w - r - 2) : x);
      y = (y - r < 0) ? (r + 2) : ((y + r > this.h) ? (this.h - r - 2) : y);

      this.ctx.beginPath();
      this.ctx.arc(x, y, 50, 0, Math.PI*2);
      this.ctx.fillStyle = "#7e22ce";
      this.ctx.fill();
    });
  }


  private DetectBalls() {
    this.balls.forEach((ball, index) => {
      const { r, x, y } = ball;
      if((Math.pow(x - this.mx, 2) + Math.pow(y - this.my, 2)) < (r * r)) {
        this.balls[index].x = this.mx;
        this.balls[index].y = this.my;
      }
    }); 
  }

  CreateBall(r: number, x: number, y: number) {
    this.balls.push({r, x, y});
  }

}

export default Ball;
