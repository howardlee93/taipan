import Warehouse from "./Warehouse";
import Shiphold from './Shiphold';
import Report from "./Report";
import { useSelector } from "react-redux";
import styles from './Game.module.css';
import { useEffect } from "react";

const Game = (props)=>{

    // const {name, shipOption} = props;
    const turn = useSelector(state => state.game.turn);
    const cash = useSelector(state => state.game.cash);
    const name = useSelector(state => state.game.name);
    const year = useSelector(state => state.game.year);
    const quarter = useSelector(state => state.game.quarter);
    const location = useSelector(state => state.game.location);
    const status = useSelector(state => state.game.ship.status);


    useEffect(()=>{ // game over conditions
        if (turn > 100){ alert('game over')}
        if (cash >= 1000000){alert ('win! you are a millionaire')}
        if (status <= 0) alert('you sunk')
    },[turn, cash, status])

    return(
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
    )
}

export default Game;