import React from "react";

export default class StarterButtons extends React.Component {
    constructor(props) {
        super(props);
        this.handleStart.bind(this);
    }

    handleStart = () => {
        this.props.startGame();
    };

    render() {
        return (
            <div className="starter-btns">
                <button className="btn" onClick={this.handleStart}>
                    Spustiť hru
                </button>
                <a href="#tutorial" className="btn">
                    Ako na to?
                </a>
            </div>
        );
    }
}
