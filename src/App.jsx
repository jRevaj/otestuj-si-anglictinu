import React from "react";
import Homescreen from "./components/Homescreen";
import "./style/style.css";

function App() {
    return (
        <main className="container">
            <div className="row heading-row">
                <h1>Otestuj si angličtinu!</h1>
            </div>
            <div className="row">
                <Homescreen />
            </div>
        </main>
    );
}

export default App;
