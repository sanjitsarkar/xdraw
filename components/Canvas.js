import { forwardRef } from "react";
import { useEffect, useContext,useRef } from 'react'
import { DrawTypeContext } from "../store/DrawTypeStore";
import { PathsContext } from "../store/PathsStore";
import { PathContext } from "../store/PathStore";
import { IndexContext } from "../store/IndexStore";
import {CIRCLE,RECTANGLE,LINE,SHAPE,SELECT, FILL_COLOR} from '../utility/Constants'
import {initPaper} from '../utility/draw'
import paperCore,{view,Path} from "paper/dist/paper-core";
import { ColorContext } from "../store/ColorStore";
import { ColorTypeContext } from "../store/ColorType";
import { StrokePropertyContext } from "../store/StrokePropertyStore";
const Canvas = forwardRef((props,ref)=>{
const canvasRef = useRef()
const {path, setPath} = useContext(PathContext)
const {index, setIndex} = useContext(IndexContext)
const {paths, setPaths} = useContext(PathsContext)
const {drawType,setDrawType} = useContext(DrawTypeContext)
const {colorType,setColorType} = useContext(ColorTypeContext)
const {fillColor,setFillColor,strokeColor,setStrokeColor} = useContext(ColorContext)
const {strokeProperty,setStrokeProperty} = useContext(StrokePropertyContext)

var myPath;
 const initPaper = () =>{
  paperCore.install(canvasRef.current)
  paperCore.setup(canvasRef.current);
  // myPath  = new Path.Circle(40,30,30)
  //   setPath(myPath)
  //   if(path)
  //   setPaths((_paths)=>[..._paths,myPath])
 
}
 const mouseEvent = () =>{
   if(drawType!==SELECT)
   {
  view.onMouseDown = onMouseDown
  view.onMouseUp = onMouseUp
  view.onMouseDrag = onMouseDrag
   }
   else{
  view.onClick = function (e) {
    if (path.contains(e.point)) {
        // do what you need to do
        console.log("clicked")
        setFillColor('violet')
    }
}
   }
}
 const initShape = (event) => {
  myPath  = new Path(event.point)
  console.log("myPayth",myPath)
	myPath.strokeColor = strokeColor
	myPath.strokeWidth = strokeProperty.strokeWidth
  setPath(myPath)
}
 const drawShape = (event) => {
  path.add(event.point)


}
 const initCircle = (event) =>{
  myPath  = new Path.Circle(event.point,30)
  myPath.center = event.point
	myPath.strokeColor = 'black';
  // myPath.fillColor = 'red'
}
 const drawCircle = (event) => {
  console.log("drawCircle")
  console.log("event",event)
}
 const initRectangle = (event) =>{
  myPath  = new Path.Rectangle(event.point,30)
	myPath.strokeColor = 'black';
  // myPath.fillColor = 'red'
}
 const drawRectangle = (event) => {
  console.log("drawRectangle")
  

}

 const handleKeyDown = (e)=>{
  // setKey(true)
  if (e.ctrlKey &&  (e.which === 122 || e.which === 90)) {
    e.preventDefault()

     handleUndo()
  } else if (e.ctrlKey & (e.which === 115 || e.which === 83)) {
    e.preventDefault()
    handleSave()
  } else if (e.ctrlKey && (e.which === 121 || e.which === 89)) {
    e.preventDefault()

    handleRedo()
  }
  else if (e.ctrlKey && (e.which === 120 || e.which === 88)) {
    e.preventDefault()

    handleClear()
  }
 }

  function onMouseDown(event) {
    switch(drawType)
    {
      case SELECT:{
        break;
      }
      case SHAPE:{
    initShape(event)
  setPath(myPath)
    setIndex(paths.length+=1)
     
    
    break;
      }
      case RECTANGLE:{
    initRectangle(event)
     
    setPath(myPath)
    setIndex(paths.length+=1)
    break;
  
      }
      case CIRCLE:{
    initCircle(event)
     
    setPath(myPath)
    setIndex(paths.length+=1)
    break;
  
      }
      
    }
   
  
  }
  
   function onMouseDrag(event) {
  switch(drawType)
  {
    case SELECT:{
      break;
    }
    case SHAPE:{

  drawShape(event)
 
  break;
  
    }
  
       
  }
  
  }
  
   function onMouseUp(event) {
    switch(drawType)
  {
    case SELECT:{
      break;
    }
  
    case RECTANGLE:{
  // drawRectangle(event)
  break;
  
    }
    case CIRCLE:{
      // drawCircle(event)
    break;
  
        }
    case SHAPE:{
   
        }
       
  }
  
    if(paths.length){
      
    setPaths((_path)=>{
      
      if(_path!==[])
      return[..._path,path]})
    }
  
  
  }
  
  useEffect(() => {
    initPaper()
    
   
  }, [])
  
  useEffect(() => {
    console.log("type",drawType)
 if(drawType==SELECT)
 {
   paths.map((_path)=>{
     if(_path!==undefined)
     _path.selected=true
    })
 }
   mouseEvent()
    

  },[drawType,path])
useEffect(() => {
  document.addEventListener('keydown',(e)=>{ handleKeyDown(e);})

    },[])

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
  
    return(<canvas ref={canvasRef} id="myCanvas" resize="true"></canvas>)
})
    


 export default Canvas;