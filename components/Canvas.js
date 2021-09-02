import { forwardRef } from "react";

const Canvas = forwardRef((props,ref)=><canvas ref={ref} id="myCanvas" resize="true"></canvas>)
    


export default Canvas;