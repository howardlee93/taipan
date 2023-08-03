import styles from './Game.module.css';
import { useSelector } from 'react-redux';


const Warehouse = () =>{

    const cargo = useSelector(state => state.game.cargo);
    const usedSpace = cargo.reduce((a, curr)=> a + curr.amount, 0)
    return(

        <div className={styles.container}>
        <h5>HongKong warehouse</h5>
        <ul className={styles.main}>
            {cargo.map(good =>
                <li key={good.name}> {good.name} : {good.amount}</li>
            )}
            </ul>
        
        <aside className={styles.aside}>
            <ul>
                <li>In use: {usedSpace} </li>
                <li>Vacant: {10000 - usedSpace}</li>
            </ul>
        </aside>
   </div>
    )   
}

export default Warehouse;