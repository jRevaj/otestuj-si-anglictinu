import React from "react";
import Game from "./Game";
import StarterButtons from "./StarterButtons";

export default class Homescreen extends React.Component {
    constructor(props) {
        super(props);
        this.startGame.bind(this);
        this.showTutorial.bind(this);
        this.state = {
            inGame: false,
            showTut: false,
        };
    }

    startGame = () => {
        this.setState({ inGame: true });
    };

    showTutorial = () => {
        if (this.state.showTut) {
            this.setState({ showTut: false });
        } else {
            this.setState({ showTut: true });
        }
    };

    render() {
        const { inGame, showTut } = this.state;
        return (
            <div className="game-container">
                {inGame ? (
                    <Game />
                ) : (
                    <StarterButtons
                        startGame={this.startGame}
                        showTutorial={this.showTutorial}
                    />
                )}

                {showTut ? (
                    <div className="tutorial" style={{ display: "block" }}>
                        Tutorial
                    </div>
                ) : (
                    <div className="tutorial" style={{ display: "none" }}>
                        Tutorial
                    </div>
                )}
            </div>
        );
    }
}
