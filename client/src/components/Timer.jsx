import "./Timer.css";

function Timer({ timeLeft }) {
  return (
    <div className="timer">
      <p>{timeLeft} before you can place a star.</p>
    </div>
  );
}

export default Timer;
