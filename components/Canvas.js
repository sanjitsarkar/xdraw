import { forwardRef, useLayoutEffect, useState } from "react";
import { useEffect, useContext,useRef } from 'react'
import { DrawTypeContext } from "../store/DrawTypeStore";
import { PathsContext } from "../store/PathsStore";
import { PathContext } from "../store/PathStore";
import { IndexContext } from "../store/IndexStore";
import {CIRCLE,RECTANGLE,LINE,FREE_DRAW,SELECT, FILL_COLOR, POLYGON, DRAW} from '../utility/Constants'
import {initPaper} from '../utility/draw'
import paperCore,{view,Path, Tool, Shape, Point,Key} from "paper/dist/paper-core";
import { ColorContext } from "../store/ColorStore";
import { ColorTypeContext } from "../store/ColorTypeStore";
import { StrokePropertyContext } from "../store/StrokePropertyStore";
import { ToolTypeContext } from '../store/ToolTypeStore'
import { HistoryContext } from "../store/HistoryStore";
import ToolBar from "./ToolBar";


const Canvas = ()=>{
const canvasRef = useRef()
const {path, setPath} = useContext(PathContext)
const {index, setIndex} = useContext(IndexContext)
const {paths, setPaths} = useContext(PathsContext)
const {drawType,setDrawType} = useContext(DrawTypeContext)
const {colorType,setColorType} = useContext(ColorTypeContext)
const {fillColor,setFillColor,strokeColor,setStrokeColor} = useContext(ColorContext)
const {strokeProperty,setStrokeProperty} = useContext(StrokePropertyContext)
const {history, setHistory} = useContext(HistoryContext)
const [tool, setTool] = useState()
const {toolType, setToolType} = useContext(ToolTypeContext)

function makeBounds(shape){
  return new Path.Rectangle({
      rectangle: shape.bounds,
      strokeColor:"green"
  });
}
const createShape = (type=LINE,event,side=3)=>
{
  let _path;
  switch(type){
    case CIRCLE:
      {
if(event.modifiers.shift)
{
        _path = new Path.Circle({
          position: event.downPoint, 
          radius: event.downPoint.subtract(event.point).length,
      })
    }
    else{
      _path = new Path.Circle({
        position: event.downPoint, 
        radius: event.downPoint.subtract(event.point),
    }) 
    }
        break
      
    }
  case LINE:
    {
      if(event.modifiers.shift)
{
        _path = new Path.Point({
          position: event.downPoint, 
          radius: event.downPoint.subtract(event.point).length,
            strokeColor: strokeColor
      })
    }
    else{
      _path = new Path.Circle({
        position: event.downPoint, 
        radius: event.downPoint.subtract(event.point),
          strokeColor: strokeColor
    }) 
    }

     
       break
    }
  case RECTANGLE:
    {
      if(event.modifiers.shift)
      {
              _path = new Path.Rectangle(
                event.downPoint, 
                [event.point.y,event.point.y]
              )
          }
          else{
            _path = new Path.Rectangle(
              event.downPoint, 
               event.point
          ) 
          }
      
           
             break

    }
  case POLYGON:
    {
      if(event.modifiers.shift)
      {
              _path = new Path.Circle({
                position: event.downPoint, 
                radius: event.downPoint.subtract(event.point).length,
            })
          }
          else{
            _path = new Path.Circle({
              position: event.downPoint, 
              radius: event.downPoint.subtract(event.point),
          }) 
          }
        
      
           
             break

    }
  case FREE_DRAW:
    {
    
if(path)
{
     _path = path
     _path.add(event.point)
     setPath(_path)
}
        break

    }
   default:
    {

  }
}

if(type!==LINE && type!==FREE_DRAW )
{
  _path.fillColor = fillColor
  _path.strokeWidth = strokeProperty.strokeWidth
_path.strokeColor = strokeColor
_path.data.state = null;
_path.removeOn({
  drag: true,
  down: false,
  up:false
})
}
setPath(_path)
}



 const initPaper = () =>{
  paperCore.install(canvasRef.current)
  paperCore.setup(canvasRef.current);

 
}

useEffect(() => {
  initPaper()
  const _tool = new Tool()
  setTool(_tool)

}, []);

useEffect(() => {
  if(tool)
  {
    tool.onMouseDrag = onMouseDrag
    tool.onMouseUp = onMouseUp
    tool.onMouseDown = onMouseDown
    view.doubleClick = (event)=>{
      _path = path
      if (_path.contains(event.point)) {
      _path.data.state = 'moving';
      console.log("MOVING")
      setPath(_path)
      return;
    }
    else{
      _path.data.state = null;
    
    }
  }
}
}, [tool,path,toolType,drawType]);



var _path;
const onMouseDown = (event)=>{
  if(toolType===DRAW)
  {
if(drawType===FREE_DRAW)
{
   _path  = new Path(event.point)
  	_path.strokeColor = strokeColor
  	_path.strokeWidth = strokeProperty.strokeWidth
setPath(_path)

}
  }
  else{
   

  }
}
const onMouseDrag = (event)=>{
  if(toolType===DRAW)
  {
    createShape(drawType,event)}
    else{
    _path = path 
  if (_path.data.state === 'moving') {
    console.log("w",event)
    _path.position = event.point;
    // _path.position = _path.position + event.point - event.lastPoint;
    setPath(_path)
  }
}



  
}
const onMouseUp = (event)=>{
  // var _boundRect;
  if(path)
  {
    setPaths((_paths)=>[..._paths,path])
    var _paths = paths
    console.log(_paths)
_paths.map((_path)=>{
  _path.selected=false

})
var _path = path
_path.selected = true;
// _boundRect = makeBounds(_path)
  }


}


useEffect(() => {
  if(paths.length)
    if(colorType===FILL_COLOR)
    {
            // paths[0].fillColor = fillColor.hex
      paths.map((_path)=>{
        if(_path!==undefined)
        _path.fillColor=fillColor.hex
       })
    }
    else{
      // paths[0].strokeColor = strokeColor.hex

      paths.map((_path)=>{
        if(_path!==undefined)
        _path.strokeColor=strokeColor.hex
       })
    }
  }, [colorType,fillColor,strokeColor]);

  useEffect(() => {
    console.log("strokeWidth",strokeProperty.strokeWidth)
  if(paths.length>1)
   {
  paths.map((_path)=>{
    if(_path!==undefined)
    _path.strokeWidth = strokeProperty.strokeWidth
       })
      }
  }, [strokeProperty]);


  useEffect(() => {
    console.log("history",history)
    console.log("history",paths)
  }, [history]);
//  const mouseEvent = () =>{

     
//   view.onMouseDown = onMouseDown
//   view.onMouseUp = onMouseUp
//   view.onMouseDrag = onMouseDrag
  

   
// }
//  const initFREE_DRAW = (event) => {
//   myPath  = new Path(event.point)
//   console.log("myPayth",myPath)
// 	myPath.strokeColor = strokeColor
// 	myPath.strokeWidth = strokeProperty.strokeWidth
//   setPath(myPath)
// }
//  const drawFREE_DRAW = (event) => {
//   path.add(event.point)


// }
//  const initCircle = (event) =>{
//   console.log("init",event.middlePoint)

//   // myPath.fillColor = 'red'
// }
//  const drawCircle = (event) => {
//  console.log("MidPoint",event.middlePoint)
//   myPath  = new Path.Circle(event.middlePoint,event.delta.length/2)
// 	myPath.strokeColor = 'black';
// 	myPath.fillColor = 'white';
// }
//  const initRectangle = (event) =>{
//   myPath  = new Path.Rectangle(event.point,30)
// 	myPath.strokeColor = 'black';
//   // myPath.fillColor = 'red'
// }
//  const drawRectangle = (event) => {
//   console.log("drawRectangle")
  

// }

//  const handleKeyDown = (e)=>{
//   // setKey(true)
//   if (e.ctrlKey &&  (e.which === 122 || e.which === 90)) {
//     e.preventDefault()

//      handleUndo()
//   } else if (e.ctrlKey & (e.which === 115 || e.which === 83)) {
//     e.preventDefault()
//     handleSave()
//   } else if (e.ctrlKey && (e.which === 121 || e.which === 89)) {
//     e.preventDefault()

//     handleRedo()
//   }
//   else if (e.ctrlKey && (e.which === 120 || e.which === 88)) {
//     e.preventDefault()

//     handleClear()
//   }
//  }

//   function onMouseDown(event) {
//     switch(drawType)
//     {
//       case SELECT:{
//         break;
//       }
//       case FREE_DRAW:{
//     initFREE_DRAW(event)
//   setPath(myPath)
//     setIndex(paths.length+=1)
     
    
//     break;
//       }
//       case RECTANGLE:{
//     initRectangle(event)
     
//     setPath(myPath)
//     setIndex(paths.length+=1)
//     break;
  
//       }
//       case CIRCLE:{
//     // initCircle(event)
     
  
//     break;
  
//       }
      
//     }
   
  
//   }
  
//    function onMouseDrag(event) {
//   switch(drawType)
//   {
//     case SELECT:{
//       break;
//     }
//     case CIRCLE:{
//       // drawCircle(event)
//       break;
//     }
//     case FREE_DRAW:{

//   drawFREE_DRAW(event)
 
//   break;
  
//     }
  
       
//   }
  
//   }
  
//    function onMouseUp(event) {
//     switch(drawType)
//   {
//     case SELECT:{
//       break;
//     }
  
//     case RECTANGLE:{
//   // drawRectangle(event)
//   break;
  
//     }
//     case CIRCLE:{
//       drawCircle(event)
//       setPath(myPath)
//       setIndex(paths.length+=1)
//     break;
  
//         }
//     case FREE_DRAW:{
   
//         }
       
//   }
  
//     if(paths.length){
      
//     setPaths((_path)=>{
      
//       if(_path!==[])
//       return[..._path,path]})
//     }
  
  
//   }
  
//   useEffect(() => {
//     initPaper()
    
   
//   }, [])
  
//   useEffect(() => {
//     console.log("type",drawType)
//  if(drawType==SELECT)
//  {
//    paths.map((_path)=>{
//      if(_path!==undefined)
//      _path.selected=true
//     })
//  }
//    mouseEvent()
    

//   },[drawType,path])
// useEffect(() => {
//   document.addEventListener('keydown',(e)=>{ handleKeyDown(e);})
// return ()=>{
//   document.removeEventListener('keydown')
// }
//     },[])

  
    return(
    <>
    <ToolBar/>
    <canvas ref={canvasRef} id="myCanvas" resize="true"></canvas>
    </>)
} 


 export default Canvas;