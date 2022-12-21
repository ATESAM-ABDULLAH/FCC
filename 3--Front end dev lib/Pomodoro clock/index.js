function App() {

    const [Display, setDisplay] = React.useState(25 * 60);//    Timer in seconds

    const [Break, setBreak] = React.useState(5);     //    Break time 
    const [Session, setSession] = React.useState(25);//    Session time

    const [clockPause, setClockPause] = React.useState(false);//      Pause/Resume
    const [onBreak, setOnBreak] = React.useState(false);//  Break/session

    const [Alarm] = React.useState(new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3"));//Audio file


    const playAlarm = () => {

        Alarm.currentTime = 0;
        Alarm.play();
    }

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return (
            minutes + ":" + seconds
        );
    }

    const changeTime = (amount, type) => {

        if (type === "break") {

            if (Break == 1 && amount == -1) { return; }
            if (Break == 60 && amount == 1) { return; }
            setBreak((prev) => prev + amount);
        }
        if (type === "session") {

            if (Session == 1 && amount == -1) { return; }
            if (Session == 60 && amount == 1) { return; }
            setSession((prev) => prev + amount);

            if (clockPause == false) {
                setDisplay(Display + (amount * 60));
            }
        }
    }

    const switchState = () => {

        let second = 1000;//1000 ms === 1 second
        let date = new Date().getTime();
        let newDate = new Date().getTime() + second;
        let onBreakVar = onBreak;

        if (clockPause == false) //if clock is running
        {
            let interval = setInterval(() => {
                date = new Date().getTime();
                if (date > newDate) {
                    setDisplay((prev) => {

                        if (prev <= 0 && onBreakVar == false)//Timer ends during session
                        {
                            playAlarm();//play alarm

                            onBreakVar = true;//start break  
                            setOnBreak(true);

                            return Break * 60;
                        }
                        if (prev <= 0 && onBreakVar == true)//Timer ends during break
                        {
                            playAlarm();//play alarm

                            onBreakVar = false;//start session  
                            setOnBreak(false);

                            return Session * 60;
                        }


                        return prev - 1;
                    })
                }
                newDate += second;
            }
                , 1000);
            localStorage.clear();
            localStorage.setItem("interval-id", interval);//store interval value in 'interval-id' as Global VAr
        }
        if (clockPause == true) //if clock is paused
        {
            clearInterval(localStorage.getItem("interval-id"))//get stored interval value
        }

        setClockPause(!clockPause);
    }

    const resetClock = () => {
        setDisplay(25 * 60);
        setBreak(5);
        setSession(25);
        setClockPause(true);
        setOnBreak(false);
        Alarm.pause();
    }

    return (

        <div className="center-align">

            <h1>POMODORO CLOCK</h1>

            <div className="dual-clock">
                <Length title="Break Length" changeTime={changeTime} type="break" time={Break} />

                <Length title="Session Length" changeTime={changeTime} type="session" time={Session} />
            </div>

            <div id="display">

                <h3 id="timer-label">{onBreak ? "Break" : "Session"}</h3>
                <h3 id="time-left">{formatTime(Display)}</h3>

                <button id="start_stop" className="btn-small light-blue darken-1" onClick={switchState}>
                    {clockPause == true ?
                        <i class="material-icons">pause</i> :
                        <i class="material-icons">play_arrow</i>}
                </button>

                <button id="reset" className="btn-small light-blue darken-1" onClick={resetClock}>
                    <i class="material-icons">loop</i>
                </button>
            </div>
        </div>
    );
}

function Length({ title, changeTime, type, time }) {

    return (

        <div id="Length">
            <h3 id={type + "-label"}>{title}</h3>

            <div className="time-sets">

                <button id={type + "-decrement"} className="btn-small light-blue darken-1" onClick={() => changeTime(-1, type)}>
                    <i class="material-icons">arrow_downward</i>
                </button>

                <h3 id={type + "-length"} >{time}</h3>

                <button id={type + "-increment"} className="btn-small light-blue darken-1" onClick={() => changeTime(+1, type)}>
                    <i class="material-icons">arrow_upward</i>
                </button>

            </div>

        </div>

    );
}

ReactDOM.render(<App />, document.getElementById('App'));