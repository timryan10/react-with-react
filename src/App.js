import { useState, useEffect } from "react";
import Container from './Components/Container';

function App() {
  const [score, setScore] = useState(0);
  const [showTargets, setShowTargets] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    let timer;
    if (showTargets && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && showTargets) {
      setGameOver(true);
      setShowTargets(false);
    }

    return () => clearInterval(timer);
  }, [showTargets, timeLeft]);

  useEffect(() => {
    if (showTargets) {
      const randomIndex = Math.floor(Math.random() * 9);
      setActiveIndex(randomIndex);
    }
  }, [showTargets, score]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setShowTargets(true);
  };

  const renderContainers = () => {
    return Array.from({ length: 9 }, (_, i) => (
      <Container
        key={i}
        index={i}
        active={i === activeIndex}
        setScore={setScore}
        score={score}
        onHit={() => {
          const newIndex = Math.floor(Math.random() * 9);
          setActiveIndex(newIndex);
        }}
      />
    ));
  };

  return (
    <div className="App">
      <h1 className="title">React-with-React</h1>
      <div className="score">Score: {score}</div>
      <div className="timer">Time Left: {timeLeft}s</div>

      {!showTargets && !gameOver && (
        <button onClick={startGame} className="start">Start</button>
      )}

      {showTargets && <div className="targets-grid">{renderContainers()}</div>}

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <button onClick={startGame} className="restart">Restart</button>
        </div>
      )}
    </div>
  );
}
export default App;
