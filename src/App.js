import { useState } from "react";
import Container from './Components/Container';

function App() {

  let [score, setScore] = useState(0)

  const createTarget = () => {
    let targets = []
    for (let i = 0; i < 9; i++){
      targets.push(
        <Container key={i} setScore={setScore} score={score} />
      )
    }
    return(
      <div>
        {targets}
      </div>
    )
  }

  return (
    <div className="App">
      <h1>React-with-React</h1>
      {score}
      {createTarget()}
    </div>
  );
}

export default App;
