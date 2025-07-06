import redSquare from './red-square.png';

const Target = ({ handleClick }) => {
    return (
      <div>
        <img
          style={{ width: '20em', height: '20em' }}
          src={redSquare}
          onClick={handleClick}
          alt="Target"
        />
      </div>
    );
  };
  
  export default Target;