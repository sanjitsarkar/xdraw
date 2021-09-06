import { useEffect,useContext} from "react";
import { ColorContext } from "../store/ColorStore";
import { ColorTypeContext } from "../store/ColorTypeStore";
import { PathsContext } from "../store/PathsStore"
import { FILL_COLOR } from "../utility/Constants";
export const useColor = ()=>
{
const {colorType} = useContext(ColorTypeContext)

const {fillColor,strokeColor} = useContext(ColorContext)

    const {paths} = useContext(PathsContext)

useEffect(() => {
    if(paths.length)
      if(colorType===FILL_COLOR)
      {
        paths.map((_path)=>{
          if(_path.selected)
          _path.fillColor=fillColor
         })
      }
      else{
  
        paths.map((_path)=>{
          if(_path.selected)
          _path.strokeColor=strokeColor
         })
      }
    }, [colorType,fillColor,strokeColor]);
}