import React from "react";
import PropTypes from 'prop-types';

import { DropTarget } from 'react-drag-drop-container';

export default class Fillable extends React.Component {
    static propTypes = {
        word: PropTypes.string.isRequired,
        currentLevel: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            word: "",
            currentLevel: this.props.currentLevel
        }
    }

    handleHit = (e) => {
        this.setState({
            word: e.dragData
        })

        e.containerElem.visibility = 'hidden'
    }

    removeWord = () => {
        this.setState({
            word: ""
        })
    }

    componentWillReceiveProps(nextLevel) {
        if (nextLevel.currentLevel !== this.state.currentLevel) {
            this.setState({
                word: "",
                currentLevel: nextLevel.currentLevel
            })
        }
    }

    render() {
        return (
            <div onClick={this.removeWord}>
                <DropTarget targetKey="word" onHit={this.handleHit} dropData={this.state.word}>
                    {this.state.word}
                </DropTarget>
            </div>
           
        )
    }
}