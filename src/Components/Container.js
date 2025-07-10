import EmptySlot from "./EmptySlot";
import Target from "./Target";

const Container = ({ index, active, setScore, score, onHit }) => {
  const handleClick = () => {
    setScore(score + 1);
    onHit();
  };

    return (
        <div className="container-slot">
        {active ? <Target handleClick={handleClick} /> : <EmptySlot />}
        </div>
    );
  
};

export default Container;