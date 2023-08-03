import styles from './Game.module.css';
import { useSelector } from 'react-redux';

const Shiphold = () =>{

    const shipInfo = useSelector(state => state.game.ship);
    const {hold} = shipInfo;


    return(

        <div className={styles.container}>
        <h5>Hold </h5>
            <ul className={styles.main}>
            {hold.map(good =>
                <li key={good.name}> {good.name} : {good.amount}</li>
            )}
            </ul>
        
        <aside className={styles.aside}>
            <ul>
                <li> size: {shipInfo.holdSize}</li>
                <li> guns: {shipInfo.guns}</li>
            </ul>
        </aside>
   </div>
    )
}

export default Shiphold;
