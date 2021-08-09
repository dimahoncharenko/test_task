import { useState } from "react";
import { Observable } from "rxjs";

import "./timer.css";

function msToTime(ms: number) {
    const date = new Date(ms);

    let seconds = date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds();
    let minutes = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
    let hours = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
    
    return `${hours}:${minutes}:${seconds}`;
}

type State = {
    status: boolean,
    time: number
}

let clock: any;

const Timer = () => {
    const [timer, setTimer] = useState<State>({ status: false, time: 0 });

    let obs = new Observable(observe => {
        observe.next();
    });
    
    function runTimer(time: number = timer.time) {
        const currentTime = Date.now() - time;

        if (clock) {
            return;
        } else {
            clock = setInterval(() => {
                setTimer(state => ({ ...state, time: Date.now() - currentTime }))
            }, 1000);
        }
    }
    
    function waitClock() {
        clearInterval(clock);
        clock = null;
        setTimer(state => ({ ...state, status: false }));
    }

    function stopClock() {
        clearInterval(clock);
        clock = null;
        setTimer(() => ({ time: 0, status: false }));
    }

    function resetClock() {
        stopClock();
        runTimer(0);
    }

    return <div className="timer">
        <span className="timer__display">
            {msToTime(timer.time)}
        </span>
        <div className="timer__controls">
            <button onClick={() => obs.subscribe(() => {
                runTimer(timer.time);
                setTimer(state => ({ ...state, status: !state.status }));
            })}>Start</button>
            <button onClick={() => obs.subscribe(() => stopClock())}>Stop</button>
            <button onDoubleClick={() => obs.pipe().subscribe(() => waitClock())}>Wait</button>
            <button onClick={() => obs.subscribe(() => resetClock())}>Reset</button>
        </div>
    </div>
};

export default Timer;