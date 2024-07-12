'use client'

import { MouseEvent, useEffect, useRef, useState } from "react";
import { CreateBall } from "../fns";

export default function Scene() {
  const [CTX, SetCTX] = useState<CanvasRenderingContext2D>();
  const [Msg, SetMsg] = useState("");
  const Canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    window.onresize = () => {
      SetMsg("reloading...");
      window.location.reload();
    } 

    const canvas = Canvas.current!;
    SetCTX(canvas.getContext('2d')!);

    if (canvas !== null) {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, []);

  const AddBall = (e: MouseEvent) => {
    const { left , top, width, height } =  Canvas.current?.getBoundingClientRect()!;
    const x = e.clientX - left;
    const y = e.clientY - top;
    CreateBall(50, x, y, width, height, CTX!);
  }


  return (
    <div className="m-auto w-full flex-1 flex gap-8">
      <p className="p-4 absolute z-10 text-white text-xl">{Msg}</p>
        <div className="com w-full">
          <canvas ref={Canvas} onClick={(e: MouseEvent) => AddBall(e)}></canvas>
        </div>
        <div className="h-full w-64 flex flex-col relative">
          <div className="absolute com w-full divide-y-2 overflow-y-auto flex flex-col">
          </div>
        </div>
      </div>
  );
}
