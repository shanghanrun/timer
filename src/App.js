import React, { useState, useRef, useEffect } from 'react';
import './App.css'

function App() {
  const [minsec, setMinsec] = useState('0:0');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [bgColor, setBgColor] = useState('white');
  const beepSound = useRef(null);

  const time2minsec = (ms) => {
    const s = Math.floor(ms / 1000);
    const min = Math.floor(s / 60);
    const sec = s - 60 * min;
    return `${min}:${sec}`;
  };

  useEffect(() => {
    if (time === 0 && timer) {
      clearInterval(timer);
      setTimer(null);
      playBeep();
    } else {
      setMinsec(time2minsec(time));
    }
  }, [time]);

  const playBeep = () => {
    beepSound.current.play();
    setBgColor('red');
  };

  const stopBeep = () => {
    beepSound.current.pause();
    setBgColor('white');
  };

  const delTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const countdown = () => {
    setTimer(
      setInterval(() => {
        setTime((prevTime) => prevTime - 1000);
      }, 1000)
    );
  };

  const start = () => {
    if (time > 0 && !timer) {
      countdown();
    }
  };

  const reset = () => {
    setTime(0);
    delTimer();
    stopBeep();
  };

  const add = (n) => {
    setTime((prevTime) => prevTime + 1000 * n);
    if (!timer) countdown();
  };

  return (
    <div>
      <div className="card" style={{ width: '16rem', backgroundColor: bgColor }}>
        <div className="card-body">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span id="bed" >01</span>
            <span id="timer">{minsec}</span>
          </div>

          <div className="row">
            {/* <button onClick={start} className="btn btn-secondary col m-1">Start</button> */}
            <button onClick={reset} className="btn btn-secondary col m-1">Stop/Reset</button>
          </div>

          <div className="row">
            <button onClick={() => add(60)} className="btn btn-secondary col m-1">+1m</button>
            <button onClick={() => add(60 * 3)} className="btn btn-secondary col m-1">+3m</button>
            <button onClick={() => add(60 * 5)} className="btn btn-secondary col m-1">+5m</button>
          </div>

          <div className="row">
            <button onClick={() => add(60 * 10)} className="btn btn-secondary col m-1">+10m</button>
            <button onClick={() => add(60 * 15)} className="btn btn-secondary col m-1">+15m</button>
            <button onClick={() => add(5)} className="btn btn-secondary col m-1">+5s</button>
          </div>
        </div>

        <audio ref={beepSound} loop>
          <source src="sounds/beep-beep.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}

export default App;
