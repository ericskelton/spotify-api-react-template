import { useState } from "react";

// simple hook for a text input
// usage: 
// const [variable, onChange] = useInput('prior value here')
// then in a text input for this example mui TextField
// <TextField value={variable} onChange={onChange} ....rest of props here/>
function useInput(priorValue){
    const [value, setValue] = useState(priorValue)

    function onChange(e){
        setValue(e.target.value)
    }
    return [value, onChange]
}

export default useInput