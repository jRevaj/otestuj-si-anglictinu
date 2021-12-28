import React from "react";
import Game from "./Game";


export default class Homescreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inGame: false
        }
    }

    render() {
        const inGame = this.state.inGame
        return (
            <div className="game-container">
                {inGame ? <Game /> : <button onClick={() => {this.setState({inGame: true})}}>Start Game</button>}
            </div>
        )
    }
}