import { useContext } from 'react';
import { SketchPicker } from 'react-color'
import { ColorContext } from '../store/ColorStore';
import { ColorTypeContext } from '../store/ColorTypeStore';
import { FILL_COLOR } from '../utility/Constants';
const ColorPicker = () => {
const {colorType} = useContext(ColorTypeContext)

    const {fillColor,setFillColor,strokeColor,setStrokeColor} = useContext(ColorContext)
    return (
       
           (<SketchPicker disableAlpha={false} className="color_picker" color={colorType===FILL_COLOR ?fillColor:strokeColor} onChange={(_color)=>colorType===FILL_COLOR ?setFillColor(_color.hex):setStrokeColor(_color.hex)} onChangeComplete={(_color)=>{colorType===FILL_COLOR ?setFillColor(_color.hex):setStrokeColor(_color.hex);
            
        }}
        
        />)
        

    );
}

export default ColorPicker;