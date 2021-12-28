import React from "react";
import PropTypes from 'prop-types';

import { DragDropContainer } from 'react-drag-drop-container';

export default class Word extends React.Component {
    static propTypes = {
        words: PropTypes.array.isRequired
    }

    render() {
        const words = this.props.words.map(word => (
            <DragDropContainer targetKey="word" dragData={word}>
                {word}
            </DragDropContainer>
        ))

        return(
            <div className="block">
                <div className="word-wrapper">
                    {words}
                </div>
            </div>
        )
    }
}