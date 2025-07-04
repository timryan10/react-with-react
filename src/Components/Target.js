import { useEffect } from "react";
import redSquare from './red-square.png'

const Target = (props) => {
    useEffect(() => {
        let randSeconds = Math.ceil(Math.random() * 10000)
        let timer = setTimeout(() => {
            props.toggle(false)
        }, randSeconds)
        return () => clearTimeout(timer)
    })

    return(
        <div>
            <img style={{'width' : '20em', 'height': '20em'}}
            src={redSquare}
            onClick={props.handleClick}
            alt="Target" />
        </div>
    )
}

export default Target