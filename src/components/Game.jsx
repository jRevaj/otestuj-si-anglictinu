import React from "react";
import levels from "../levels.json"
import { cloneDeep, isUndefined } from "lodash";

import { getSentence, getWords } from "./TextConverter";
import Sentence from "./Sentence";
import Word from "./Word";
import Solution from "./Solution";

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.handleBackToHomescreen.bind(this)
        this.state = {
            currentLevel: localStorage.getItem('currentLevel') !== null ? ~~localStorage.getItem('currentLevel') : localStorage.setItem('currentLevel', 1),
            levels: levels.levels,
            totalLevels: levels.levels.length,
            sentence: this.loadSentences(levels.levels[localStorage.getItem('currentLevel') - 1].sentence),
            words: this.loadWords(levels.levels[localStorage.getItem('currentLevel') - 1].sentence),
            hint: levels.levels[localStorage.getItem('currentLevel') - 1].hint,
            finished: false,
            showResults: false,
            showHint: false,
            results: []
        }
    }

    componentDidMount() {
        this.setState({
            currentLevel: localStorage.getItem('currentLevel') ? ~~localStorage.getItem('currentLevel') : localStorage.setItem('currentLevel', this.state.currentLevel)
        })
    }

    handleNext = () => {
        if (this.state.currentLevel === this.state.totalLevels) {
            this.setState({ finished: true })
        } else {
            this.setState({
                currentLevel: (this.state.currentLevel < this.state.totalLevels) ? (this.state.currentLevel + 1) : (this.state.currentLevel),
                sentence: this.loadSentences(levels.levels[this.state.currentLevel].sentence),
                words: this.loadWords(levels.levels[this.state.currentLevel].sentence),
                hint: levels.levels[this.state.currentLevel].hint,
                finished: false,
                showResults: false,
                showHint: false
            })
        }
    }

    updateStorage() {
        let level = this.state.currentLevel

        localStorage.setItem('currentLevel', level)
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

    handleBackToHomescreen = () => {
        this.props.backToHomescreen()

        localStorage.setItem('currentLevel', 1)
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
                    renderElements.push(`${answers[i][j].word} nie je správne.`)
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



    shuffleWords(wordsArr) {
        for (let i = 0; i < wordsArr.length; i++) {
            const rand = Math.floor(Math.random() * (i + 1));
            const temp = wordsArr[i];
            wordsArr[i] = wordsArr[rand];
            wordsArr[rand] = temp;
        }
        return wordsArr;
    }

    render() {
        const { showResults, finished, sentence, words, levels } = this.state
        let shuffledWords = cloneDeep(words)
        let solution = cloneDeep(sentence)
        shuffledWords = this.shuffleWords(shuffledWords)
        this.updateStorage()

        return(
            <section className="game">
                {finished 
                    ? (
                        <div className="row final-row">
                            <h4>Gratulujeme, prešli ste všetky levely!</h4>
                            <button className="btn btn-ma-top" onClick={this.handleBackToHomescreen}>Vrátiť sa na začiatok</button>
                        </div>
                    ) 
                    : (
                        <div>
                            <div className="row final-row">
                                {this.state.currentLevel !== 1 
                                    ? <button className="btn" onClick={this.handleRestart} style={{display: "block"}}>Hrať od začiatku</button>
                                    : <button className="btn" onClick={this.handleRestart} style={{display: "none"}}>Hrať od začiatku</button>}    
                            </div>
                            <div className="row btns-row">
                                <h2>Level {this.state.currentLevel}</h2>
                                <button className="btn" onClick={this.handleNext}>Ďalší level</button>
                            </div>
                            <div>
                                <div className="sentence-row">
                                    <h4>Vyplňte chýbajúce slová:</h4>
                                    {sentence.map((item, idx) => {
                                        return <Sentence sentence={item} key={idx} currentLevel={this.state.currentLevel} />
                                    })}
                                </div>
                                <div className="words-row">
                                    <h4>Slová ktoré môžete použiť:</h4>
                                    <div className="row">
                                        {shuffledWords.map((item, idx) => {
                                        return !isUndefined(item) && <Word words={item} key={idx} />
                                    })}
                                    </div>
                                </div>
                                <div className="row bottom-btns-row">
                                    <div className="col">
                                        <button className="btn" onClick={this.showResults}>Ohodnotiť</button>
                                    </div>
                                    <div className="col">
                                        <a href="#hint" className="btn" onClick={() => {
                                            let body = document.body
                                            if (this.state.showHint === false) {
                                                this.setState({ showHint: true })
                                                body.classList.add("overflowhidden")
                                            }
                                        }}>Potrebujem poradiť!</a>
                                    </div>
                                </div>

                                <div id="hint" className="popup" style={{ display: "block" }}>
                                    <div className="popup__content">
                                        <h3>Ako na to?</h3>
                                        <a href="#game" className="popup__close" onClick={() => {
                                            let body = document.body
                                            if (this.state.showHint === true) {
                                                this.setState({ showHint: false })
                                                body.classList.remove("overflowhidden")
                                            }
                                        }}>&times;</a>
                                        <p>V každom leveli na vás čaká 10 viet, do ktorých je potrebné doplniť slová zo sekcie "Slová, ktoré môžete použiť". Pre menšie sťaženie, už vyplnené slová v tomto zozname ostávajú. Slová sa vo vetách môžu opakovať. Samotné vety sú povyberané z vybraných gramatických topicov, avšak sú pomiešané. To znamená, že v jednom leveli sú napríklad vety s minulým časom ale aj s frázami. Pri každom leveli je hint, kde si viete pozrieť dodatočné pomôcky alebo zobraziť riešenie.</p>
                                        <h6>Narábanie so slovami:</h6>
                                        <p>Slová treba umiestniť do boxu zvýrazneného slabožltým spodným okrajom. Pri správnom nasmerovaní slova nad box sa tento okraj zmení na červený. Po vypustení kliknutia sa slovo vloží do daného boxu.</p>
                                        <h6>Odstránenie slova:</h6>
                                        <p>Už vyplnené slová sa dajú odstrániť z boxu kliknutím na slovo.</p>
                                        <h6>Zobrazenie hodnotenia:</h6>
                                        <p>Hodnotenie viete zobraziť hocikedy bezohľadu na to či ste niečo vyplnili alebo nie. Vyplnenie viet sa dá vyhodnotiť koľkokrát potrebujete. Viete si ním kontrolovať správnosť odpovedí ak dané vety neviete doplniť a tým pádom sa učiť správne použitie daných slov vo vetách.</p>
                                        <h6>Pomôcka:</h6>
                                        <p>{levels[this.state.currentLevel - 1].hint}</p>
                                        <div className="row popup__row">
                                            <button className="btn btn-inverted" onClick={() => {
                                                solution = document.getElementById("solution")
                                                if (solution.style.display === "none") {
                                                    solution.style.display = "block"
                                                } else {
                                                    solution.style.display = "none"
                                                }

                                            }}>Zobraziť riešenie</button>
                                        </div>
                                        <div id="solution" className="sentence-row" style={{display: "none"}}>
                                            {sentence.map((item, idx) => {
                                                    return  <Solution key={idx} sentence={item} currentLevel={this.state.currentLevel} />
                                                })}
                                        </div>
                                    </div>
                                </div>
                                {showResults 
                                    ? (<div id="results" className="results" style={{display: "block"}}>
                                        <h4>Vyhodnotenie:</h4>
                                        {this.getResults()}
                                    </div>)
                                    : <div id="results" className="results" style={{display: "none"}}></div>
                                }
                            </div>
                        </div>
                    )
                }  
            </section>
        )
    }
}