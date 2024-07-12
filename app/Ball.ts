class Ball {
  r: number;
  x: number;
  y: number;
  w: number;
  h: number;
  ctx: CanvasRenderingContext2D;

  constructor(r: number, x: number, y: number, w: number, h: number, ctx: CanvasRenderingContext2D) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    
    const MainLoop = (create: Boolean) => {
      create && ctx.clearRect(0, 0, w, h);
      this.CreateBall();
      requestAnimationFrame(() => MainLoop(false));
    }
    requestAnimationFrame(() => MainLoop(true));

  }

  private CreateBall() {
    this.x = (this.x - this.r < 0) ? (this.r + 2) : ((this.x + this.r > this.w) ? (this.w - this.r - 2) : this.x);
    this.y = (this.y - this.r < 0) ? (this.r + 2) : ((this.y + this.r > this.h) ? (this.h - this.r - 2) : this.y);

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 50, 0, Math.PI*2);
    this.ctx.fillStyle = "#7e22ce";
    this.ctx.fill();
  }
}

export default Ball;
