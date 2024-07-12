export function CreateBall(r: number, x: number, y: number, w: number, h: number, ctx: CanvasRenderingContext2D) {
  
  x = (x - r < 0) ? (r + 2) : ((x + r > w) ? (w - r - 2) : x);
  y = (y - r < 0) ? (r + 2) : ((y + r > h) ? (h - r - 2) : y);

  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI*2);
  ctx.fillStyle = "#7e22ce";
  ctx.fill();
}
