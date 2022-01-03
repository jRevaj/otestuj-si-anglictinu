import React from "react";
import PropTypes from "prop-types";
import Fillable from "./Fillable";

export default class Sentence extends React.Component {
    static propTypes = {
        sentence: PropTypes.array.isRequired,
        currentLevel: PropTypes.number.isRequired,
    };

    render() {
        const sentence = this.props.sentence.map((word, idx) => {
            if (word.type === "word") {
                return (
                    <div className="word" data-testid={"word"} key={idx}>
                        {word.text}
                    </div>
                );
            }
            return (
                <Fillable
                    key={idx}
                    wordText={word.text}
                    currentLevel={this.props.currentLevel}
                />
            );
        });
        return <div className="word-wrapper sentence">{sentence}</div>;
    }
}
