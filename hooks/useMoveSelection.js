import { project } from "paper/dist/paper-core";
import { useContext } from "react";
import { PathContext } from "../store/PathStore"
import {  useProject } from "./useProject";
export const useMoveSelection = ()=>{
  const {setPath} = useContext(PathContext)
  let paths = []
  let activeLayer = {}
  if(project)
  {
  paths = project?.activeLayer.children
  activeLayer = project?.activeLayer.children
  }

const moveSelection = (event)=>{


  paths.forEach(_path => {
      if(_path.selected)
      {
      _path.position = event.point
      setPath(_path)
      }
    });

  }
  return [moveSelection]
}