import redSquare from './red-square.png';

const Target = ({ handleClick }) => {
    return (
      <div className='target-box'>
        <img
          className='target-img'
          src={redSquare}
          onClick={handleClick}
          alt="Target"
        />
      </div>
    );
  };
  
  export default Target;