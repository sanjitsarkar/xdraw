import { project } from "paper/dist/paper-core";
import { useEffect,useContext} from "react";
import { ColorTypeContext } from "../store/ColorTypeStore";
import { ItemPropertyContext } from "../store/ItemPropertyStore";
import { FILL_COLOR } from "../utility/Constants";
export const useItemPropertyEffect = ()=>
{
const {colorType} = useContext(ColorTypeContext)

const {itemProperty} = useContext(ItemPropertyContext)
const {fillStyle,strokeStyle,rotate,position,size} = itemProperty
let paths = []
let activeLayer = {}
if(project)
{
paths = project.activeLayer.children
activeLayer = project.activeLayer.children
}


useEffect(() => {
    if(paths.length)
      if(colorType===FILL_COLOR)
      {
        paths.map((_path)=>{
          if(_path.selected)
          _path.fillColor=fillStyle.color
         })
      }
      else{
  
        paths.map((_path)=>{
          if(_path.selected)
          {
          _path.strokeColor=strokeStyle.color
          }
         })
      }
    }, [colorType,fillStyle,strokeStyle]);

    useEffect(() => {
      paths.map((_path)=>{
        if(_path.selected)
        {
        _path.rotate(rotate)
        }
       })
    }, [rotate]);
    useEffect(() => {
      paths.map((_path)=>{
        if(_path.selected)
        {
        _path.position=position
        }
       })
    }, [position]);
    useEffect(() => {
      paths.map((_path)=>{
        if(_path.selected)
        {
        _path.size=strokeStyle.size
        }
       })
    }, [size]);
}