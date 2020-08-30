function Button({ buttonClass, keyName, handleClick }) {
    return (
      <button className={buttonClass} onClick={handleClick}>
        {keyName}
      </button>
    );
  }
  
  function Screen({ firstRow, secondRow }) {
    return (
      <div className="screen">
        <div className="screen-first-row">{firstRow}</div>
        <div className="screen-second-row">{secondRow}</div>
      </div>
    );
  }
  
  class App extends React.Component {
  
    constructor() {
      super();
      this.state = {
        operator: "",
        opPressed: false,
        firstRow: 0,
        secondRow: 0
      };
  
      // Store the calculating history, until '='is pressed.
      // history is only for the first row displaying.
      this.history = []; 
      // result of every time calculation    
      this.result = 0;
  
      // The key get pressed;
      this.key = null;
    }
    /**
     * All clear function;
     * 
     * @memberof App
     */
    allClear() {
      this.history = [];
      this.result = 0;
      this.display();
    }
    /**
     * Clear the entry, only for numbers entry;
     * 
     * @memberof App
     */
    clearEntry() {
      this.history.pop();
      this.display();
    }
  
    /**
     * Check the input key
     * 
     * @param {number | string} key
     * @return {void}
     */
    pressKey(key) {
      this.key = key;
      switch (typeof key) {
        case 'number':
          this.history.push(key);
          this.display();
          break;
        case 'string':
          if (key === 'AC') {
            this.allClear();
            break;
          } else if (key === '.') {
            this.history.push(key);
            this.display();
            break;
          } else if(key === 'CE') {
            this.clearEntry();
            break;
          } else if(key === '=') {
            //this.history.push(key);
            //this.display();
            this.result=eval(this.history.join(''));
            this.display();
            break;
          } else {
            this.history.push(key);
            this.display();
            break;
          }
        default:
          break;
      }
    }
  
    /**
     * Display function
     * 
     * @param {number|string} key 
     * @memberof App
     */
    display() {
      let firstRow = this.history.join('') ? this.history.join('') : 0,
        secondRow = this.result;
  
      //if (key === '=') {
      //  secondRow = this.result;
      //}
  
  
      this.setState(prevState => ({
        firstRow,
        secondRow
      }))
  
    }
  
    render() {
      const firstRow = this.state.firstRow,
        secondRow = this.state.secondRow;
  
      console.log(firstRow, secondRow);
  
      return (
        <div className="shell">
          <Screen
            firstRow={firstRow}
            secondRow={secondRow}
          />
          <div className="keys-row">
            <Button buttonClass={"btn btn-danger"} keyName={"AC"} handleClick={() => this.pressKey('AC')} />
            <Button buttonClass={"btn btn-danger"} keyName={"CE"} handleClick={() => this.pressKey("CE")} />
            <Button buttonClass={"btn btn-info"} keyName={"("} handleClick={() => this.pressKey('(')} />
            <Button buttonClass={"btn btn-info"} keyName={")"} handleClick={() => this.pressKey(')')} />
          </div>
          <div className="keys-row">
            <Button buttonClass={"btn btn-default"} keyName={"7"} handleClick={() => this.pressKey(7)} />
            <Button buttonClass={"btn btn-default"} keyName={"8"} handleClick={() => this.pressKey(8)} />
            <Button buttonClass={"btn btn-default"} keyName={"9"} handleClick={() => this.pressKey(9)} />
            <Button buttonClass={"btn btn-info"} keyName={"+"} handleClick={() => this.pressKey('+')} />
          </div>
          <div className="keys-row">
            <Button buttonClass={"btn btn-default"} keyName={"4"} handleClick={() => this.pressKey(4)} />
            <Button buttonClass={"btn btn-default"} keyName={"5"} handleClick={() => this.pressKey(5)} />
            <Button buttonClass={"btn btn-default"} keyName={"6"} handleClick={() => this.pressKey(6)} />
            <Button buttonClass={"btn btn-info"} keyName={"-"} handleClick={() => this.pressKey('-')} />
          </div>
          <div className="keys-row">
            <Button buttonClass={"btn btn-default"} keyName={"1"} handleClick={() => this.pressKey(1)} />
            <Button buttonClass={"btn btn-default"} keyName={"2"} handleClick={() => this.pressKey(2)} />
            <Button buttonClass={"btn btn-default"} keyName={"3"} handleClick={() => this.pressKey(3)} />
            <Button buttonClass={"btn btn-info"} keyName={"x"} handleClick={() => this.pressKey('*')} />
            
          </div>
          <div className="keys-row">
            <Button buttonClass={"btn btn-default"} keyName={"0"} handleClick={() => this.pressKey(0)} />
            <Button buttonClass={"btn btn-default"} keyName={"."} handleClick={() => this.pressKey(".")} />
            <Button buttonClass={"btn btn-primary "} keyName={"="} handleClick={() => this.pressKey('=')} />
            <Button buttonClass={"btn btn-info"} keyName={"÷"} handleClick={() => this.pressKey('/')} />
          </div>
        </div>
      )
    }
  }
  
  ReactDOM.render(<App />, document.getElementById("calculator-body"));
  