import React from "react";

export default class StarterButtons extends React.Component {
    constructor(props) {
        super(props)
        this.handleStart.bind(this)
        this.handleTutorial.bind(this)
    }

    handleStart = () => {
        this.props.startGame()
    }

    handleTutorial = () => {
        this.props.showTutorial()
    }

    render() {
        return (
            <div className="starter-btns">
                <button onClick={this.handleStart}>Spustiť hru</button>
                <button onClick={this.handleTutorial}>Ako na to?</button>
            </div>
        )
    }
}