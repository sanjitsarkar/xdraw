import paperCore from "paper/dist/paper-core";

export const initPaper = (canvasRef) =>{
    paperCore.install(canvasRef.current)
    paperCore.setup(canvasRef.current);
  
   
  }
  