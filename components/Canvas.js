import React,{ useState } from "react";
import { useEffect, useContext,useRef } from 'react'
import { PathsContext } from "../store/PathsStore";
import {SELECT} from '../utility/Constants'
import paperCore, { PaperScope, project, Tool} from "paper/dist/paper-core";

import { ToolTypeContext } from '../store/ToolTypeStore'
import ToolBar from "./ToolBar";
import { ShowColorPickerContext } from "../store/ShowColorPickerStore";
import { useHandleKeyDown } from "../hooks/useHandleKeyDown";
import { initPaper } from "../hooks/initPaper";
import { useItemPropertyEffect } from "../hooks/useItemPropertyEffect";
import { handleMouseEvents } from "../hooks/handleMouseEvents";
import Layers from "./Layers";
import PropertyPanel from "./PropertyPanel";
import { PathContext } from "../store/PathStore";
import { IsSelectedContext } from "../store/IsSelectedStore";
const Canvas = ()=>{
const canvasRef = useRef()
const downloadRef = useRef()

const {toolType,setToolType} = useContext(ToolTypeContext)
const [tool, setTool] = useState()
const {showColorPicker, setShowColorPicker} = useContext(ShowColorPickerContext)
const [keyDown] = useHandleKeyDown(downloadRef)
const {path} = useContext(PathContext)
const {isSelected, setIsSelected,isMultiSelected, setIsMultiSelected} = useContext(IsSelectedContext)

useEffect(() => {
  initPaper(canvasRef)
  const _tool = new Tool()
  setTool(_tool)
}, []);

useItemPropertyEffect()
handleMouseEvents(tool)
useEffect(() => {
  // console.log(paperCore.project)
}, [keyDown]);
  
useEffect(() => {
  if(tool)
tool.onKeyDown = keyDown
  
}, [tool,keyDown]);



  
    return(
    <>
    <a ref={downloadRef} hidden/>
    <ToolBar/>
    <div className="group main">
      <div className="left">
        <Layers/>
      </div>
    <canvas ref={canvasRef} className="canvas" resize="true" onClick={()=>{
      if(showColorPicker)
      {
      setToolType(SELECT)
      setShowColorPicker(false)
      }
      
  
    }}></canvas>
    {
    
    <div className="right">
      {/* Right */}
      <PropertyPanel/>
    </div>
}
    </div>
    </>)
} 


 export default Canvas;