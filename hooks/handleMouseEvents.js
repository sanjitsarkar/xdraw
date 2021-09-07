import { Path, project } from "paper/dist/paper-core";
import  { useContext, useEffect } from "react";
import { PathContext } from "../store/PathStore";
import { ShapeTypeContext } from "../store/ShapeTypeStore";
import { ToolTypeContext } from "../store/ToolTypeStore";
import {  useCreateShape } from "./useCreateShape";
import { useMakeSelection } from "./useMakeSelection";
import {FREE_DRAW, DRAW, PEN_TOOL, SELECT, MOVE, LINE} from '../utility/Constants'
import { ColorContext } from "../store/ColorStore";
import { ItemPropertyContext } from "../store/ItemPropertyStore";
import { useMoveSelection } from "./useMoveSelection";
import { useProject } from "./useProject";
import { IsSelectedContext } from "../store/IsSelectedStore";
export const handleMouseEvents = (tool)=>{
  const {strokeColor} = useContext(ColorContext)
  const {path, setPath} = useContext(PathContext)
  const {shapeType} = useContext(ShapeTypeContext)
  const {toolType,setToolType} = useContext(ToolTypeContext)
const {itemProperty} = useContext(ItemPropertyContext)
  const [createShape] = useCreateShape()
  const [makeSelection] = useMakeSelection()
  const [moveSelection] = useMoveSelection()
const {isSelected, setIsSelected,isMultiSelected, setIsMultiSelected} = useContext(IsSelectedContext)

  let paths = []
let activeLayer = {}
if(project)
{
paths = project.activeLayer.children
activeLayer = project.activeLayer.children
}
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
        _path.strokeColor = itemProperty.strokeStyle.strokeColor
        _path.strokeWidth = itemProperty.strokeStyle.width
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
    path.data.state=null;
  
     if(toolType===SELECT)
    {
      // console.log("mu",toolType)
      setToolType(MOVE)
    }
    // else if(toolType===MOVE)
    // {
    //   setToolType(SELECT)
    // }
     else if(toolType===DRAW)
    {
if(shapeType!==FREE_DRAW && shapeType!==LINE )
{
setToolType(SELECT)

}
    }
    if(path)
    {
      if(toolType===DRAW)
      {
  paths && paths.map((_path)=>{
    _path.selected=false
  
  })
  path.selected = true
  setIsSelected(true)
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
  