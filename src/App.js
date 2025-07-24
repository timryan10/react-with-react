import { useState, useEffect, useRef } from "react";
import Container from './Components/Container';

function App() {
  const [score, setScore] = useState(0);
  const [showTargets, setShowTargets] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const targetTimeoutRef = useRef(null);

  useEffect(() => {
    let timer;
    if (showTargets && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && showTargets) {
      setGameOver(true);
      setShowTargets(false);
      clearTimeout(targetTimeoutRef.current);
    }

    return () => clearInterval(timer);
  }, [showTargets, timeLeft]);

  const spawnNewTarget = () => {
    const newIndex = Math.floor(Math.random() * 9);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (activeIndex !== null && showTargets) {
      clearTimeout(targetTimeoutRef.current);
      targetTimeoutRef.current = setTimeout(() => {
        spawnNewTarget(); // respawn another
      }, 1000); // Timeout to hit
    }
    return () => clearTimeout(targetTimeoutRef.current);
  }, [activeIndex, showTargets]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setShowTargets(true);
    spawnNewTarget();
  };

  const handleHit = () => {
    clearTimeout(targetTimeoutRef.current);
    setScore(prev => prev + 1);
    spawnNewTarget();
  };

  const renderContainers = () => {
    return Array.from({ length: 9 }, (_, i) => (
      <Container
        key={i}
        index={i}
        active={i === activeIndex}
        onHit={handleHit}
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