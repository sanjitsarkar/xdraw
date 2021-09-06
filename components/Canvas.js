import React,{ useState } from "react";
import { useEffect, useContext,useRef } from 'react'
import { PathsContext } from "../store/PathsStore";
import {SELECT,DRAW, MOVE} from '../utility/Constants'
import { Tool} from "paper/dist/paper-core";

import { ToolTypeContext } from '../store/ToolTypeStore'
import ToolBar from "./ToolBar";
import { ShowColorPickerContext } from "../store/ShowColorPickerStore";
import { useHandleKeyDown } from "../hooks/useHandleKeyDown";
import { initPaper } from "../hooks/initPaper";
import { useColor } from "../hooks/useColor";
import { handleMouseEvents } from "../hooks/handleMouseEvents";

const Canvas = ()=>{
const canvasRef = useRef()
const downloadRef = useRef()

const {paths} = useContext(PathsContext)
const {toolType,setToolType} = useContext(ToolTypeContext)
const [tool, setTool] = useState()
const {showColorPicker, setShowColorPicker} = useContext(ShowColorPickerContext)
const [keyDown] = useHandleKeyDown(downloadRef)



useEffect(() => {
  console.log(keyDown)
  initPaper(canvasRef)
  const _tool = new Tool()
  setTool(_tool)

}, []);

useColor()
handleMouseEvents(tool)
  


useEffect(() => {
 const listener =  document.addEventListener('keydown',(e)=>{ keyDown(e);})
return()=>{
  document.removeEventListener("keydown",listener)
}
    },[keyDown])

  
    return(
    <>
    <a ref={downloadRef} hidden/>
    <ToolBar/>
    <canvas ref={canvasRef} id="myCanvas" resize="true" onClick={()=>{
      if(showColorPicker)
      {
      setToolType(SELECT)
      setShowColorPicker(false)
      }
      
  
    }}></canvas>
    </>)
} 


 export default Canvas;