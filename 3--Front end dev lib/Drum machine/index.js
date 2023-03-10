const audioImports = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];


function App() {
    const [volume, setVolume] = React.useState(1);

    return (
        <div id="drum-machine" className="bg-primary  min-vh-100  text-white">
            <div id="display" className="text-center">
                <h1>Drum machine</h1>
                {audioImports.map(
                    (clip) => (<Pad key={clip.id} clip={clip} volume={volume} />))
                }
                <br />
                <p id="display" className="current-text">sound</p>
                <br /><br />
                <h2>Volume</h2>
                <input type="range" step="0.01" max="1" min="0" value={volume}
                    className="w-50" onChange={(e) => setVolume(e.target.value)} />
            </div>
        </div>
    );

}

function Pad({ clip, volume }) {

    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyPress)
        return () => {
            document.removeEventListener("keydown", handleKeyPress)
        };
    }, []);

    const handleKeyPress = (e) => {
        if (e.keyCode === clip.keyCode) {
            playSound();
        }
    };

    const playSound = () => {
        const audio = document.getElementById(clip.keyTrigger)
        setActive(true);
        setTimeout(() => setActive(false), 100);
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play();
    };

    return (

        <div id="drum-pad" onClick={playSound} className={`drum-pad btn btn-secondary p-4 m-3 ${active && "btn-warning"}`}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </div>
    );
}



ReactDOM.render(<App />, document.getElementById('App'));