import React from "react";
import PropTypes from "prop-types";

import { DropTarget } from "react-drag-drop-container";

export default class Fillable extends React.Component {
    static propTypes = {
        wordText: PropTypes.string.isRequired,
        currentLevel: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            wordText: "",
            currentLevel: this.props.currentLevel,
            filled: false,
        };
    }

    handleHit = (e) => {
        this.setState({
            wordText: e.dragData,
            filled: true,
        });

        e.containerElem.visibility = "hidden";
    };

    removeWord = () => {
        this.setState({
            wordText: "",
            filled: false,
        });
    };

    componentWillReceiveProps(nextLevel) {
        if (nextLevel.currentLevel !== this.state.currentLevel) {
            this.setState({
                wordText: "",
                currentLevel: nextLevel.currentLevel,
                filled: false,
            });
        }
    }

    render() {
        return (
            <div
                className="fillable"
                data-testid="answer"
                data-filled={this.state.filled}
                onClick={this.removeWord}
            >
                <DropTarget
                    targetKey="word"
                    onHit={this.handleHit}
                    dropData={this.state.wordText}
                >
                    {this.state.wordText}
                </DropTarget>
            </div>
        );
    }
}
