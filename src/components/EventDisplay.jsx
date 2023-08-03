import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {GOODS, locations, buyGoods, sellGoods, addNextTurn, deposit, withdraw,
    addMoney, damageShip, blownPort, buyGuns, upgradeShip
} from '../store/gameSlice';

const EventDisplay = (props)=>{
    // const [message, setMessage]  = useState('');
    // const dispatch = useDispatch();
    // const turn = useSelector(state => state.game.turn);
    // const cash = useSelector(state => state.game.cash);
    // const guns = useSelector(state => state.game.ship.guns);
    
    // const generateRandEvent = () =>{
    //     let message, damage, moneyGained;
    //     let chance = Math.random()* (100-1) + 1;
    //     //if(turn < 11) return;
    //     if (cash >= 10000) chance += 10;
    //     if (chance < 70) setMessage('smooth voyage')
    
    //     if (chance >= 70 && chance < 80){
    //         damage = Math.floor(Math.random() * (11-0) + 0);
    //         let newPort = Math.floor( Math.random() * (6-1)); 
    //         dispatch(damageShip(damage));
    //         dispatch(blownPort(newPort));
    //         message = `STORM! you suffered ${damage} % damage and got blown to ${locations[newPort]}`
    //         setMessage(message);
    //     }
    //     if (chance >= 80 && chance < 90){ // pirate attack
    //         let winChance = Math.random() + guns * 0.02;
    //         if (winChance > 0.5){// ship wins
    //             moneyGained = (cash * Math.random() + cash);
    //             damage = Math.random() * (20 -0) + 0;
    //             dispatch(addMoney(moneyGained))
    //             dispatch(damageShip(damage));
    //             message = ` won ${moneyGained} from the pirates and suffered ${damage} % damage`;
    //             setMessage(message);
    //         }else{ // ship loses
    //             if (cash > 0)  moneyGained = -1 * cash * Math.random()
    //             else damage = Math.random() * (40 - 0) + 0; // if no cash, pirates wreaks more damage
    //             dispatch(addMoney(moneyGained))
    //             dispatch(damageShip(damage));
    //             message = `lost against the pirates and suffered ${damage} % damage and they took ${ moneyGained?
    //                     moneyGained : 0} booty `;
    //             setMessage(message);
    //         }
    //     }
    //     console.log(chance, damage, moneyGained, )
    // };

    // useEffect(()=>{
    //     generateRandEvent();
    // })

    return(
        <>
        <p>{props.message}</p>
        
        </>
    )
}

export default EventDisplay;