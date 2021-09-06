import { Path } from "paper/dist/paper-core";
import { useContext } from "react";
import { PathsContext } from "../store/PathsStore"
import { PathContext } from "../store/PathStore"
import { ToolTypeContext } from "../store/ToolTypeStore";
import { MOVE } from "../utility/Constants";
export const useMakeSelection = ()=>{
  const {paths} = useContext(PathsContext)
  const {setPath} = useContext(PathContext)
  const {setToolType,toolType} = useContext(ToolTypeContext)
const makeSelection = (event)=>{



    var __point = event.point
    var __path = new Path.Rectangle(
      event.downPoint, 
       event.point
  ) 
  
  __path.strokeColor = "black"
  __path.dashArray = [10,10]
    //  console.log("__path",__path)
     var _paths = paths
    //  console.log("__paths",_paths)
  _paths.forEach(_path => {
    if (_path.contains(__point) || _path.isInside(__path.bounds) || _path.intersects(__path) || _path.contains(__path)) {
      _path.data.state = 'moving';
      _path.selected = true
      // _path.position = event.point;
      // _path.position = _path.position + event.point - event.lastPoint;
      setPath(_path)
     
      // return;
    }
    else{
      // _path.data.state = null;
      _path.selected = false
    
    }
  });
  __path.removeOn({
    drag: true,
    down: true,
    up:true
  })
  }
  return [makeSelection]
}