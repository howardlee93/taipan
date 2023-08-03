import {createListenerMiddleware} from '@reduxjs/toolkit';
import{ locations, addMoney, damageShip, blownPort, buyGuns, upgradeShip} from './gameSlice';
import store from '../store/store';
// export const listenerMiddleware = createListenerMiddleware()

const state = store.getState();


const EVENTS = [
    'Nothing',
    'Storm to X port',
    'Storm damages Y percentage points',
    'Pirates attack: steal items + Y damage/ booty',
    'Tax',
    'Seize opium + fine',
    'upgrade'
]


export const generateRandEvent = ()=>{
    // if (state.turn < 11) return;
    let chance = Math.random()* (100-1) + 1;
    let damage, moneyGained, message
    if (state.game.cash > 11000){
        chance + 10;
    }

    if (chance < 70) message = EVENTS[0]; 
    if (chance >= 70 && chance <= 80){ // storm
        damage = Math.floor(Math.random() * (11-0) + 0);
        let newPort = Math.floor( Math.random() * (6-1)); 

        // store.dispatch(damageShip(damage));
        // store.dispatch(blownPort(newPort));
        message = `STORM! you suffered ${damage} % damage and got blown to ${locations[newPort]}`
    }

    if (chance >= 81 && chance <=92){ // pirate attack
        let winChance = Math.random() + state.game.ship.guns * 0.02;
        if (winChance > 0.5){// ship wins
            moneyGained = (state.game.cash * Math.random() + state.game.cash);
            damage = Math.random() * (20 -0) + 0;
            message = ` won ${moneyGained} from the pirates and suffered ${damage} % damage`;
        }else{ // ship loses
            if (state.cash > 0) moneyGained = -1 *state.game.cash * Math.random()
            else damage = Math.random() * (40 -0) + 0; // if no cash, pirates wreaks more damage
         
            message = `lost against the pirates and suffered ${damage} % damage and they took ${ moneyGained?
                moneyGained : 0} booty `;

        }
    }

    if (chance >= 92){ // tax
        moneyGained = -1* state.game.cash * Math.random()
        // store.dispatch(addMoney(moneyGained))
        message = `tax of ${state.game.cash}`;
    }
    console.log(message, chance, damage, moneyGained)
    return {message, chance, damage, moneyGained};
    
}

export const upgrade = ()=>{
    const shipCost = Math.random() *state.game.cash;
    store.dispatch(upgradeShip(shipCost))
    return 'upgraded ship!'
}

export const moreGuns = ()=>{
    const gunCost = Math.random() *state.game.cash;
    store.dispatch(buyGuns(gunCost))
    return 'added guns!'
}




// listenerMiddleware.startListening({
// });
