import { Path } from "paper/dist/paper-core";
import { useContext } from "react";
// import { ColorContext } from "../store/ColorStore";
import { PathContext } from "../store/PathStore";
import { ItemPropertyContext } from "../store/ItemPropertyStore";
// import { ToolTypeContext } from "../store/ToolTypeStore";
import {CIRCLE,RECTANGLE,LINE,FREE_DRAW, POLYGON, PEN_TOOL, SELECT} from '../utility/Constants'
export const useCreateShape = ()=>
{
const {itemProperty} = useContext(ItemPropertyContext)
const {path, setPath} = useContext(PathContext)
  // const {fillColor,strokeColor} = useContext(ColorContext)
  // const {setToolType} = useContext(ToolTypeContext)
  let _path;
  const createShape = (type=LINE,event,side=3)=>
  {
  switch(type){
    case CIRCLE:
      {
if(event.modifiers.shift)
{
  if(_path)
  {
    _path.remove()
  }
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
    _path.name="circle"
        break
      
    }
  case LINE:
    {

        _path = new Path.Line(event.downPoint,event.point)
    
  
        _path.name="line"

     
       break
    }
  // case PEN_TOOL:
  //   {

       
    
  //       _path.add(event.point)

     
  //      break
  //   }
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
      
     _path.name="rectangle"
           
             break

    }
  case POLYGON:
    {
      // console.log("poly",event)
      if(event.keyDown)
      {
              _path = new Path.RegularPolygon(
                event.downPoint,
                side,
                event.downPoint.subtract(event.point).length,
            )
          }
          else{
            _path = new Path.RegularPolygon( event.downPoint,
              side,
             event.downPoint.subtract(event.point).length,
          )
          }
        
    _path.name="polygon"
      
           
             break

    }
  case FREE_DRAW:
    {
    
if(path)
{
     _path = path
     _path.add(event.point)
     _path.name="drawing"
     setPath(_path)

}
        break

    }
  case PEN_TOOL:
    {
    
if(path)
{
     _path = path
     _path.add(event.point)
    _path.name="curve"

     setPath(_path)
}
        break

    }
  //  default:
  //   {

  // }
}
  
_path.strokeWidth = itemProperty.strokeStyle.width
_path.strokeColor = itemProperty.strokeStyle.color

if(type!==FREE_DRAW && type!==PEN_TOOL )
{
  
  _path.fillColor = itemProperty.fillStyle.color
  _path.removeOn({
    drag: true,
    down: false,
    up:false
  })
  _path.data.state = "selection"
  setPath(_path)
}
}
return [createShape]
}
