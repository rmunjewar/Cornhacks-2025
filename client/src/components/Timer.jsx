import "./Timer.css";

function Timer({ timeLeft }) {
  let seconds = Math.floor(timeLeft / 1000);

  return (
    <div className="timer">
      {(seconds > 0)? (
        <p>{seconds} seconds before you can place a star.</p>
      ) : (
        <p>Click anywhere to place a star.</p>
      )}
    </div>
  );
}

export default Timer;
