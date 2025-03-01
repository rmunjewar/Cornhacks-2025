import "./Timer.css";

function Timer({ timeLeft }) {
  let seconds = timeLeft / 1000;

  return (
    <div className="timer">
      <p>{seconds} seconds before you can place a star.</p>
    </div>
  );
}

export default Timer;
