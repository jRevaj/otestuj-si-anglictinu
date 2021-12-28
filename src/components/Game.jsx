import React from "react";
import levels from "../levels.json"

import { getSentence, getWords } from "./TextConverter";
import Sentence from "./Sentence";
import Word from "./Word";
import { render } from "@testing-library/react";



export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLevel: 1,
            levels: levels.levels,
            totalLevels: levels.levels.length,
            sentence: this.loadSentences(levels.levels[0].sentence),
            words: this.loadWords(levels.levels[0].sentence),
            hint: levels.levels[0].hint,
            finished: false,
            showResults: false,
            showHint: false,
            results: []
        }
    }

    handleNext = () => {
        this.setState({
            currentLevel: this.state.currentLevel < this.state.totalLevels ? this.state.currentLevel + 1 : this.state.currentLevel,
            sentence: this.loadSentences(levels.levels[this.state.currentLevel].sentence),
            words: this.loadWords(levels.levels[this.state.currentLevel].sentence),
            hint: levels.levels[this.state.currentLevel].hint,
            finished: this.state.currentLevel === this.state.totalLevels ? this.setState({ finished: true }) : this.setState({ finished: false }),
            showResults: false,
            showHint: false
        })
    }

    handleRestart = () => {
        this.setState({
            finished: false,
            currentLevel: 1,
            sentence: this.loadSentences(levels.levels[0].sentence),
            words: this.loadWords(levels.levels[0].sentence),
            hint: levels.levels[0].hint,
            showResults: false,
            showHint: false
        })
    }

    loadSentences(sentenceArr) {
        const sentences = []
        for (let i = 0; i < sentenceArr.length; i++) {
            sentences.push(getSentence(sentenceArr[i]))
        }
        return sentences
    }

    loadWords(sentenceArr) {
        const words = []
        for (let i = 0; i < sentenceArr.length; i++) {
            words.push(getWords(sentenceArr[i]))
        }
        return words
    }

    loadAnswers() {
        let resultsArr = []
        let answers = []
        
        let container = document.querySelectorAll(".sentence")
        for (let i = 0; i < container.length; i++) {
            answers.push(container[i].querySelectorAll("[data-testid='answer']"))
        }

        for (let i = 0; i < answers.length; i++) {
            let sentence = []
            for (let j = 0; j < answers[i].length; j++) {
                sentence.push({word: answers[i][j].innerText, filled: answers[i][j].dataset.filled})
            }
            resultsArr.push(sentence)
        }
        
        return resultsArr
    }

    getResults() {
        const answers = this.loadAnswers()
        const renderElements = []

        for (let i = 0; i < answers.length; i++) {
            for (let j = 0; j < answers[i].length; j++) {
                if (answers[i][j].word === "") {
                    renderElements.push(`${j + 1}. slovo v ${i + 1}. vete nebolo vyplnené.`)
                } else if (answers[i][j].word !== this.state.words[i][j]) {
                    renderElements.push(`${answers[i][j].word} nie je správne. Správna odpoveď je ${this.state.words[i][j]}`)
                } else {
                    renderElements.push(`${answers[i][j].word} je správne.`)
                }
            }
        }

        return renderElements.map((element, idx) => {
            return <p key={idx}>{element}</p>
        })
    }

    showResults = () => {
        this.setState({
            showResults: true
        })
    }

    render() {
        const { showResults, showHint, finished, sentence, words } = this.state

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
                    {sentence.map((item, idx) => {
                        return <Sentence sentence={item} key={idx} currentLevel={this.state.currentLevel} />
                    })}
                </div>
                <div className="row">
                    {words.map((item, idx) => {
                        return <Word words={item} key={idx} />
                    })}    
                </div>
                <div className="row">
                    <button onClick={this.showResults}>Test</button>
                    <button onClick={() => {this.setState({showHint: true})}}>I need hint!</button>
                </div>
                {showHint 
                    ? <div id="hint" className="hint" style={{display: "block"}}>{this.state.hint}</div> 
                    : <div id="hint" className="hint" style={{display: "none"}}>{this.state.hint}</div>}
                {showResults 
                    ? <div id="results" className="results" style={{display: "block"}}>{this.getResults()}</div>
                    : <div id="results" className="results" style={{display: "block"}}></div>
                }
            </section>
        )
    }
}