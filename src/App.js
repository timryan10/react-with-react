import { useState, useEffect, useRef } from "react";
import Container from './Components/Container';

const difficultyConfig = {
  easy:    { timeout: 1500, duration: 30 },
  medium:  { timeout: 1000, duration: 30 },
  hard:    { timeout: 600,  duration: 30 },
};

function App() {
  const [score, setScore] = useState(0);
  const [showTargets, setShowTargets] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [timeoutDuration, setTimeoutDuration] = useState(1000);
  //leaderboard state
  const [bestScores, setBestScores] = useState(() => {
    const saved = localStorage.getItem("reaction-best-scores");
    return saved ? JSON.parse(saved) : { easy: 0, medium: 0, hard: 0 };
  });

  const targetTimeoutRef = useRef(null);
  const lastIndexRef = useRef(null);

  useEffect(() => {
    if (gameOver && difficulty) {
      setBestScores(prev => {
        const currentBest = prev[difficulty] || 0;
        if (score > currentBest) {
          const updated = { ...prev, [difficulty]: score };
          localStorage.setItem("reaction-best-scores", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    }
  }, [gameOver, difficulty, score]);

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
    let newIndex;
    let tries = 0;
    do {
      newIndex = Math.floor(Math.random() * 9);
      tries++;
    } while (newIndex === lastIndexRef.current && tries < 10);
  
    lastIndexRef.current = newIndex;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (activeIndex !== null && showTargets) {
      clearTimeout(targetTimeoutRef.current);
      targetTimeoutRef.current = setTimeout(() => {
        spawnNewTarget();
      }, timeoutDuration);
    }
    return () => clearTimeout(targetTimeoutRef.current);
  }, [activeIndex, showTargets, timeoutDuration]);

  const startGame = () => {
    const config = difficultyConfig[difficulty];
    if (!config) return;

    setTimeoutDuration(config.timeout);
    setTimeLeft(config.duration);
    setScore(0);
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
      <h1 className="title">React Reaction Game</h1>
      <div className="score">Score: {score}</div>
      <div className="timer">Time Left: {timeLeft}s</div>

      {!showTargets && !gameOver && (
        <>
          <div className="difficulty-select">
            <label>Select Difficulty:</label>
            <div className="difficulty-buttons">
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`difficulty-btn ${difficulty === level ? "selected" : ""}`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)} (Best: {bestScores[level]})
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={startGame}
            className="start"
            disabled={!difficulty}
          >
            Start
          </button>
        </>
      )}

      {showTargets && <div className="targets-grid">{renderContainers()}</div>}

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <button
            onClick={() => {
              setGameOver(false);
              setShowTargets(false);
              setDifficulty(null);
              setActiveIndex(null);
            }}
            className="restart"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
