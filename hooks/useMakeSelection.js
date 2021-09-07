import { Path, project } from "paper/dist/paper-core";
import { useContext } from "react";
import { IsSelectedContext, IsSelectedProvider, IsSelectedStore } from "../store/IsSelectedStore";
import { PathContext } from "../store/PathStore"
export const useMakeSelection = ()=>{
  const {setPath} = useContext(PathContext)
  const {isSelected, setIsSelected,isMultiSelected, setIsMultiSelected} = useContext(IsSelectedContext)
const makeSelection = (event)=>{
  let paths = []
  let activeLayer = {}
  if(project)
  {
  paths = project?.activeLayer.children
  activeLayer = project?.activeLayer.children
  }


    var __path = new Path.Rectangle(
      event.downPoint, 
       event.point
  ) 
  __path.data.state = "selection"
   var __point = event.downPoint
  __path.strokeColor = "black"
  __path.dashArray = [10,10]
    //  console.log("__path",__path)
    //  console.log("__paths",paths)
var _count = 0;

  paths.forEach(_path => {

    if (_path.contains(__point) || _path.isInside(__path.bounds) || _path.intersects(__path) || _path.contains(__path)) {
      _path.data.state = 'moving';
      _path.selected = true
      _count++;
      // console.log("Hello inside")
      // _path.position = event.point;
      // _path.position = _path.position + event.point - event.lastPoint;
      setPath(_path)
      setIsMultiSelected(false)
    setIsSelected(true)
      // return;
    }
    else{
      // _path.data.state = null;
      _count=0
      _path.selected = false
      setIsMultiSelected(false)
      setIsSelected(false)
    
    }
  });
  if(_count===1)
  {
    // setIsMultiSelected(true)
    setIsSelected(true)
  }
  // else if(_count==1){
  //   setIsMultiSelected(false)
  //   setIsSelected(true)
  // }
  __path.removeOn({
    drag: true,
    down: true,
    up:true
  })

  
}
return [makeSelection]
}