import React from "react";

class Clock extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>现在是 {this.props.date}.</h2>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {elements: []}
    }

    append = () => {
        const element = <h>New Element</h>;
        const copy = this.state.elements;
        copy.push(element);
        this.setState({elements: copy});
    }

    render() {
        return <div className="App">
            <header className="App-header">
                <p>
                    Edit  <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Clock date={"asdf"} url={"http://www.runoob.com"}/>
                {this.state.elements.map((e) => {
                    return e;
                })}
                <button onClick={this.append}>Append new element</button>
            </header>
        </div>
    }
}

export default App;
