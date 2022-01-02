import React from "react";
import PropTypes from 'prop-types';

export default class Solution extends React.Component {
    static propTypes = {
        sentence: PropTypes.array.isRequired,
        currentLevel: PropTypes.number.isRequired
    }

    render() {
        const sentence = this.props.sentence.map((word, idx) => {
            if (word.type === 'word') {
                return (
                    <div className="word" key={idx}>{word.text}</div>
                )
            }
            return (
                <div className="word answer" key={idx}>{word.text}</div>
            )
        })
        return(
            <div className="word-wrapper sentence">
                {sentence} 
            </div>
        )
    }
}