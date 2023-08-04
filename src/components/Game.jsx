import Warehouse from "./Warehouse";
import Shiphold from './Shiphold';
import Report from "./Report";
import { useSelector } from "react-redux";
import styles from './Game.module.css';
import { useEffect, useState } from "react";

const Game = (props)=>{

    const turn = useSelector(state => state.game.turn);
    const cash = useSelector(state => state.game.cash);
    const name = useSelector(state => state.game.name);
    const year = useSelector(state => state.game.year);
    const quarter = useSelector(state => state.game.quarter);
    const location = useSelector(state => state.game.location);
    const status = useSelector(state => state.game.ship.status);
    const [gameOver, setGameOver] = useState(false);
    const [overMessage, setOverMessage] = useState('');

    useEffect(()=>{ // game over conditions
        if (turn > 100){ 
            if (cash >500000) setOverMessage('you win, barely')
            setGameOver(true)}
        if (cash >= 1000000){
            setOverMessage('you win, barely')
            setGameOver(true)}
        if (status <= 0){
            setOverMessage('you lose, barely')
            setGameOver(true);
        }
    },[turn, cash, status])

    return(
        <>
        {!gameOver ? 
        <div className={styles.container}>
            <h4> Welcome, captain {name}! </h4>

        <div className={styles.main}>
            <Warehouse/>
            <Shiphold/>
            <Report location={location}/>
        </div>

        <aside className={styles.aside}>
            <ul>
                <li>{quarter} {year}</li>
                <li>{location}</li>
                <li>ship health: {status} %</li>
            </ul>
        </aside>

        </div>

        :
        <p>{overMessage}</p>
        }
        </>
    )
}

export default Game;