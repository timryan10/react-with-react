import { useState } from "react";
import EmptySlot from "./EmptySlot";
import Target from "./Target";

const Container = (props) => {
    let [target, setTarget] = useState(false)

    const handleClick = (e) => {
        props.setScore(props.score + 40)
        setTarget(false)
    }

    let displayTarget = target ? <Target setScore={props.setScore} toggle={setTarget} handleClick={handleClick} /> : <EmptySlot toggle={setTarget} />

    return(
        <div style={{'display': 'inline-block', 'width': '20em', 'height': '20em', 'border': 'solid'}}>
            {displayTarget}
        </div>
    )
}

export default Container