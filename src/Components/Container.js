import EmptySlot from "./EmptySlot";
import Target from "./Target";

const Container = ({ index, active, setScore, score, onHit }) => {
  const handleClick = () => {
    setScore(score + 1);
    onHit();
  };

  return (
    <div
      style={{ width: '20em', height: '20em', border: 'solid', display: 'inline-block' }}
      className="container"
    >
      {active ? <Target handleClick={handleClick} /> : <EmptySlot />}
    </div>
  );
};

export default Container;