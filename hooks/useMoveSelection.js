import { Path } from "paper/dist/paper-core";
import { useContext } from "react";
import { PathsContext } from "../store/PathsStore"
import { PathContext } from "../store/PathStore"
export const useMoveSelection = ()=>{
  const {paths} = useContext(PathsContext)
  const {setPath} = useContext(PathContext)
const moveSelection = (event)=>{


     var _paths = paths
  _paths.forEach(_path => {
      if(_path.selected=true)
      _path.position = event.point
      setPath(_path)
    });

  }
  return [moveSelection]
}