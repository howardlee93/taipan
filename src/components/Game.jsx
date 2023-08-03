import Warehouse from "./Warehouse";
import Shiphold from './Shiphold';
import Report from "./Report";
import { useSelector } from "react-redux";
import styles from './Game.module.css';

const Game = (props)=>{

    // const {name, shipOption} = props;
    const name = useSelector(state => state.game.name);
    const year = useSelector(state => state.game.year);
    const quarter = useSelector(state => state.game.quarter);
    const location = useSelector(state => state.game.location);
    const status = useSelector(state => state.game.ship.status);

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