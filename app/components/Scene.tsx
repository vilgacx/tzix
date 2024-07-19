'use client'

import { MouseEvent, useEffect, useRef, useState } from "react";
import Ball from "../Ball";
import ToggleBtn from "./ToggleBtn";

export default function Scene() {
  const Canvas = useRef<HTMLCanvasElement>(null);
  const [CTX, SetCTX] = useState<CanvasRenderingContext2D>(); 
  const [BallInstance, SetBallInstance] = useState<Ball>();
  const [CanAddBall, SetCanAddBall] = useState(true);
  
  const [Msg, SetMsg] = useState("");

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

  useEffect(() => {
    if (CTX && Canvas) {
      const { left, top, width, height } =  Canvas.current?.getBoundingClientRect()!;
      const ball_instance = new Ball(width, height, CTX!);

      SetBallInstance(ball_instance);
 
      let Hold = false;
      Canvas.current!.onmousedown = () => {
        Hold =  true;
        Canvas.current!.onmousemove =  (event) => {
          if (Hold) {
            SetCanAddBall(false)
            ball_instance.mx = event.clientX - left;
            ball_instance.my = event.clientY - top;
          } else {
            SetCanAddBall(true);
          }
        }
      };
      Canvas.current!.onmouseup = () => { Hold = false }; 
      
    }
  },[CTX, Canvas])

  const AddBall = (e: MouseEvent) => {
    if (CanAddBall) {
      const { left , top } =  Canvas.current?.getBoundingClientRect()!;
      const x = e.clientX - left;
      const y = e.clientY - top;
      BallInstance?.CreateBall(50, x, y);
    } 
  } 


  return (
    <div className="m-auto w-full flex-1 flex gap-8">
      <p className="p-4 absolute z-10 text-white text-xl">{Msg}</p>
      <div className="com w-full">
        <canvas ref={Canvas} onClick={(e: MouseEvent) => !!(localStorage.getItem('ADD_BALL')) ? AddBall(e) : null }></canvas>
      </div>
      <div className="h-full w-64 flex flex-col relative">
        <div className="absolute com w-full divide-y-2 overflow-y-auto flex flex-col p-2 gap-2">
          <ToggleBtn name="ADD_BALL" />
        </div>
      </div>
    </div>
  );
}
