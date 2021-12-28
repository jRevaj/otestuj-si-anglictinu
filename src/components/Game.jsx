import React from "react";
import levels from "../levels.json"

import { getSentence, getAnswers } from "./TextConverter";
import Sentence from "./Sentence";
import Word from "./Word";



export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLevel: 1,
            levels: levels.levels,
            totalLevels: levels.levels.length,
            sentence: getSentence(levels.levels[0].sentence),
            words: getAnswers(levels.levels[0].sentence),
            hint: levels.levels[0].hint,
            finished: false,
            showResults: false,
            showHint: false
        }
    }

    handleNext = () => {
        this.setState({
            currentLevel: this.state.currentLevel < this.state.totalLevels ? this.state.currentLevel + 1 : this.state.currentLevel,
            sentence: getSentence(levels.levels[this.state.currentLevel].sentence),
            words: getAnswers(levels.levels[this.state.currentLevel].sentence),
            hint: levels.levels[this.state.currentLevel].hint,
            finished: this.state.currentLevel === this.state.totalLevels ? this.setState({ finished: true }) : this.setState({ finished: false }),
            showHint: false
        })
    }

    handleRestart = () => {
        this.setState({
            finished: false,
            currentLevel: 1,
            sentence: getSentence(levels.levels[0].sentence),
            words: getAnswers(levels.levels[0].sentence),
            hint: levels.levels[0].hint,
            showHint: false
        })
    }

    render() {
        const { showResults, showHint, finished } = this.state

        return(
            <section className="game">
                <div className="row">
                    {finished ? <h2>You won!</h2> : <h2>Level {this.state.currentLevel}</h2>}
                    <button onClick={this.handleNext}>Next level</button>
                    {this.state.currentLevel !== 1 
                        ? <button onClick={this.handleRestart} style={{display: "block"}}>New game</button>
                        : <button onClick={this.handleRestart} style={{display: "none"}}>New game</button>}
                    
                </div>
                <div className="row">
                    <Sentence marked={showResults} sentence={this.state.sentence} currentLevel={this.state.currentLevel} />
                </div>
                <div className="row">
                    <Word words={this.state.words} />
                </div>
                <div className="row">
                    <button>Test</button>
                    <button onClick={() => {this.setState({showHint: true})}}>I need hint!</button>
                </div>

                {showHint ? <div id="hint" className="hint" style={{display: "block"}}>{this.state.hint}</div> : <div id="hint" className="hint" style={{display: "none"}}>{this.state.hint}</div>}
            </section>
        )
    }
}