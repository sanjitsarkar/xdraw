import { useContext } from 'react';
import { SketchPicker } from 'react-color'
import { ColorContext } from '../store/ColorStore';
import { ColorTypeContext } from '../store/ColorTypeStore';
import { FILL_COLOR } from '../utility/Constants';
const ColorPicker = () => {
const {colorType} = useContext(ColorTypeContext)

    const {fillColor,setFillColor,strokeColor,setStrokeColor} = useContext(ColorContext)
    return (
       
           (<SketchPicker styles={{width:"200px",margin:"0"}} color={colorType===FILL_COLOR ?fillColor:strokeColor} onChange={(_color)=>colorType===FILL_COLOR ?setFillColor(_color):setStrokeColor(_color)} onChangeComplete={(_color)=>colorType===FILL_COLOR ?setFillColor(_color):setStrokeColor(_color)}/>)
        

    );
}

export default ColorPicker;