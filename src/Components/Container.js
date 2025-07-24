import EmptySlot from "./EmptySlot";
import Target from "./Target";

const Container = ({ index, active, onHit }) => {
  const handleClick = () => {
    if (active) onHit(); // Only trigger if it's the active one
  };

  return (
    <div className="container-slot">
      {active ? <Target handleClick={handleClick} /> : <EmptySlot />}
    </div>
  );
};

export default Container;
