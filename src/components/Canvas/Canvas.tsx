import { FC } from "react";
import "./Canvas.style.scss";
import { Backdrop } from "../Backdrop/Backdrop";

type CanvasProps = {
  canvasRef?: React.Ref<HTMLCanvasElement>;
  overlayMessage?: React.ReactNode;
};

export const Canvas: FC<CanvasProps> = ({ canvasRef, overlayMessage }) => {
  return (
    <Backdrop>
      <div className="canvas__frame">
        <div className="canvas__container">
          <canvas
            className="canvas"
            ref={canvasRef}
            width={64}
            height={32}
          ></canvas>
          {overlayMessage && (
            <div className="canvas__overlay">
              <div className="canvas__overlay-content">{overlayMessage}</div>
            </div>
          )}
        </div>
      </div>
    </Backdrop>
  );
};
