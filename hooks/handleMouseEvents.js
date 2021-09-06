import { Path } from "paper/dist/paper-core";
import React, { useContext, useEffect } from "react";
import { PathsContext } from "../store/PathsStore";
import { PathContext } from "../store/PathStore";
import { ShapeTypeContext } from "../store/ShapeTypeStore";
import { ToolTypeContext } from "../store/ToolTypeStore";
import {  useCreateShape } from "./useCreateShape";
import { useMakeSelection } from "./useMakeSelection";
import {FREE_DRAW, DRAW, PEN_TOOL, SELECT, MOVE, LINE} from '../utility/Constants'
import { ColorContext } from "../store/ColorStore";
import { StrokePropertyContext } from "../store/StrokePropertyStore";
import { useMoveSelection } from "./useMoveSelection";
export const handleMouseEvents = (tool)=>{
  const {strokeColor} = useContext(ColorContext)
  const {paths, setPaths} = useContext(PathsContext)
  const {path, setPath} = useContext(PathContext)
  const {shapeType} = useContext(ShapeTypeContext)
  const {toolType,setToolType} = useContext(ToolTypeContext)
const {strokeProperty} = useContext(StrokePropertyContext)
  const [createShape] = useCreateShape()
  const [makeSelection] = useMakeSelection()
  const [moveSelection] = useMoveSelection()
  const boundShape = (item) =>{
    var rect = new Path.Rectangle(item.bounds)
    rect.strokeColor = "skyblue"
    rect.removeOn({
      drag: true,
    down: true,
    up:false
    })
  }
useEffect(() => {
    if(tool)
    {
      tool.onMouseDrag = onMouseDrag
      tool.onMouseUp = onMouseUp
      tool.onMouseDown = onMouseDown
    
  }
  }, [tool,path,toolType,shapeType]);
  
  
  
  var _path;
  const onMouseDown = (event)=>{
  
    if(toolType===DRAW)
    {
  if(shapeType===FREE_DRAW)
  {
     _path  = new Path(event.point)
        _path.strokeColor = strokeColor
        _path.strokeWidth = strokeProperty.strokeWidth
  setPath(_path)
  
  }
  
  
    }
    else{
  
      makeSelection(event)
       
    }
  }
  const onMouseDrag = (event)=>{

    switch(toolType)
    {
    case DRAW:{
      if(shapeType!==PEN_TOOL)
      {
      createShape(shapeType,event)
      }
      break
    }
     case SELECT:
       {
         
        makeSelection(event)

  break
  
  }
  case MOVE:{

    moveSelection(event)
    break
  }
  
  
  
    
  }
}
  const onMouseUp = (event)=>{
  
     if(toolType===SELECT)
    {
      console.log("mu",toolType)
      setToolType(MOVE)
    }
    else if(toolType===MOVE)
    {
      setToolType(SELECT)
    }
     else if(toolType===DRAW)
    {
if(shapeType!==FREE_DRAW && shapeType!==LINE )
{
setToolType(SELECT)

}
    }
    if(path)
    {
      setPaths((_paths)=>[..._paths,path])
      if(toolType===DRAW)
      {
      var _paths = paths
  _paths.map((_path)=>{
    // _path.selected=false
  
  })
  var _path = path
  // _path.selected = true;
  boundShape(path)
      }
      // else if(toolType===SELECT)
      // {
      //   console.log("toolMove")
      //   setToolType(MOVE)
      //   console.log("toolMove",toolType)
      // }
      // else if(toolType===MOVE)
      // {
      //   var _paths = paths
      //   _paths.map((_path)=>{
      //     _path.data.state = null
      //     _path.selected = false;
        
      //   })
       
      // }
  
    }
  
  
  }
  
}
  