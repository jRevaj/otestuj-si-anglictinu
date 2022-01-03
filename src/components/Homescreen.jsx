import React from "react";
import Game from "./Game";
import StarterButtons from "./StarterButtons";

export default class Homescreen extends React.Component {
    constructor(props) {
        super(props)
        this.startGame.bind(this)
        this.backToHomescreen.bind(this)

        const storedState = localStorage.getItem('inGame') ? JSON.parse(localStorage.getItem('inGame')) : false

        this.state = {
            inGame: storedState
        }
    }

    startGame = () => {
        this.setState({ inGame: true })
    }

    backToHomescreen = () => {
        this.setState({ inGame: false })
    }

    updateStorage(val) { 
        localStorage.setItem('inGame', JSON.stringify(val))
    }

    render() {
        const { inGame } = this.state;
        this.updateStorage(inGame)
        return (
            <div id="game" className="game-container">
                {inGame ? (
                    <Game backToHomescreen={this.backToHomescreen} />
                ) : (
                    <StarterButtons
                        startGame={this.startGame}
                        showTutorial={this.showTutorial}
                    />
                )}

                <div id="tutorial" className="popup" style={{ display: "block" }}>
                    <div className="popup__content">
                        <h3>Ako na to?</h3>
                        <a href="#game" className="popup__close">&times;</a>
                        <p>V každom leveli na vás čaká 10 viet, do ktorých je potrebné doplniť slová zo sekcie "Slová, ktoré môžete použiť". Pre menšie sťaženie, už vyplnené slová v tomto zozname ostávajú. Slová sa vo vetách môžu opakovať. Samotné vety sú povyberané z vybraných gramatických topicov, avšak sú pomiešané. To znamená, že v jednom leveli sú napríklad vety s minulým časom ale aj s frázami. Pri každom leveli je hint, kde si viete pozrieť dodatočné pomôcky alebo zobraziť riešenie.</p>
                        <h6>Narábanie so slovami:</h6>
                        <p>Slová treba umiestniť do boxu zvýrazneného slabožltým spodným okrajom. Pri správnom nasmerovaní slova nad box sa tento okraj zmení na červený. Po vypustení kliknutia sa slovo vloží do daného boxu.</p>
                        <h6>Odstránenie slova:</h6>
                        <p>Už vyplnené slová sa dajú odstrániť z boxu kliknutím na slovo.</p>
                        <h6>Zobrazenie hodnotenia:</h6>
                        <p>Hodnotenie viete zobraziť hocikedy bezohľadu na to či ste niečo vyplnili alebo nie. Vyplnenie viet sa dá vyhodnotiť koľkokrát potrebujete. Viete si ním kontrolovať správnosť odpovedí ak dané vety neviete doplniť a tým pádom sa učiť správne použitie daných slov vo vetách.</p>
                    </div>
                </div>
            </div>
        );
    }
}
