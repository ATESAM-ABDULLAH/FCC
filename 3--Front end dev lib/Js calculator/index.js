function App() {
    const [Expression, setExpression] = React.useState("");//state for display
    const [Answer, setAnswer] = React.useState(0);//state for answer

    const display = (symbol) => {
        setExpression(prev => prev + symbol);

        if (Expression.endsWith("=")) {
            if (/[0-9.]/.test(symbol)) {
                setExpression(symbol);
            }
            else {
                setExpression(Answer + symbol);
            }
        }

        if (Expression.endsWith(".") && symbol == ".") {
            setExpression(prev => prev.slice(0, -1));
        }
    };

    const evaluate = () => {
        setAnswer(eval(Expression));
        setExpression(prev => prev + "=");
    };

    const clear = () => { setExpression(""); setAnswer(0); };

    const charClear = () => { setExpression(prev => prev.slice(0, -1)) };

    return (
        <div className="wrapper">
            <div className="grid">
                <div className="dis" id="display">
                    <input type="text" value={Expression} placeholder="0" disabled />
                    <div className="total">{Answer}</div>
                </div>

                <div onClick={clear} className="padButton red" id="clear">AC</div>
                <div onClick={charClear} className="padButton red" id="charClear">C</div>
                <div onClick={() => display("%")} className="padButton lightGrey" id="mod">%</div>
                <div onClick={() => display("/")} className="padButton lightGrey" id="divide">/</div>
                <div onClick={() => display("1")} className="padButton darkGrey" id="one">1</div>
                <div onClick={() => display("2")} className="padButton darkGrey" id="two" >2</div>
                <div onClick={() => display("3")} className="padButton darkGrey" id="three">3</div>
                <div onClick={() => display("*")} className="padButton lightGrey" id="multiply">x</div>
                <div onClick={() => display("4")} className="padButton darkGrey" id="four">4</div>
                <div onClick={() => display("5")} className="padButton darkGrey" id="five">5</div>
                <div onClick={() => display("6")} className="padButton darkGrey" id="six">6</div>
                <div onClick={() => display("-")} className="padButton lightGrey" id="subtract">-</div>
                <div onClick={() => display("7")} className="padButton darkGrey" id="seven">7</div>
                <div onClick={() => display("8")} className="padButton darkGrey" id="eight" >8</div>
                <div onClick={() => display("9")} className="padButton darkGrey" id="nine">9</div>
                <div onClick={() => display("+")} className="padButton lightGrey" id="add">+</div>
                <div onClick={() => display("0")} className="padButton darkGrey" id="zero">0</div>
                <div onClick={() => display(".")} className="padButton darkGrey" id="decimal" >.</div>
                <div onClick={evaluate} className="padButton blue" id="equals" >=</div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('App'));