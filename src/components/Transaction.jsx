import { useDispatch, useSelector } from "react-redux";
import {GOODS, locations, buyGoods, sellGoods, addNextTurn, deposit, withdraw,
    addMoney, damageShip, blownPort, buyGuns, upgradeShip
} from '../store/gameSlice';
import { useEffect, useState } from "react";
import Transfer from './Transfer';
import FixForm from "./FixForm";
import EventDisplay from "./EventDisplay";


const Transaction = (props)=>{
    const {type, setModalOpen} = props;
    const dispatch = useDispatch();
    const [amount, setAmount] = useState();
    const [good, setGood] = useState();
    const [depositAmount, setDepositAmount] = useState();
    const [withdrawAmount, setWithdrawAmount] = useState();
    const [eventLoading, setEventLoading] = useState(false);
    //rand events
    const [message, setMessage]  = useState('');
    const turn = useSelector(state => state.game.turn);
    const cash = useSelector(state => state.game.cash);
    const guns = useSelector(state => state.game.ship.guns);
    
    const generateRandEvent = () =>{
        let message, damage, moneyGained;
        let chance = Math.random()* (100-1) + 1;
        if(turn < 5){ 
            setMessage('smooth voyage');
            return;
        }
        if (cash >= 10000) chance += 10;
        if (chance < 70) setMessage('smooth voyage')
    
        if (chance >= 70 && chance < 80){
            damage = Math.floor(Math.random() * (11-0) + 0);
            let newPort = Math.floor( Math.random() * (6-1)); 
            dispatch(damageShip(damage));
            dispatch(blownPort(newPort));
            message = `STORM! you suffered ${damage} % damage and got blown to ${locations[newPort]}`
            setMessage(message);
        }
        if (chance >= 80 && chance < 90){ // pirate attack
            let winChance = Math.random() + guns * 0.02;
            if (winChance > 0.5){// ship wins
                moneyGained = (cash * Math.random() + cash);
                damage = Math.random() * (20 -0) + 0;
                dispatch(addMoney(moneyGained))
                dispatch(damageShip(damage));
                message = ` won ${moneyGained} from the pirates and suffered ${damage} % damage`;
                setMessage(message);
            }else{ // ship loses
                if (cash > 0)  moneyGained = -1 * cash * Math.random()
                else damage = Math.random() * (40 - 0) + 0; // if no cash, pirates wreaks more damage
                dispatch(addMoney(moneyGained))
                dispatch(damageShip(damage));
                message = `lost against the pirates and suffered ${damage} % damage and they took ${ moneyGained?
                        moneyGained : 0} booty `;
                setMessage(message);
            }
        }
        console.log(chance, damage, moneyGained, message )
    }
    

    const eventRef = ()=>{
        setTimeout(()=>{
            setEventLoading(false);
            setModalOpen(false)
        },4000)
    }

    useEffect(()=>{
        clearTimeout(eventRef)
    })


    if (type === 'fix'){
        return (
            <FixForm
                cash={cash}
                setModalOpen={setModalOpen}
            />
        )
    }
    
    if (type === 'buy') {
        return (
            <>
            { good === undefined ? 
            <>
                <p> What do you want to buy?</p>
                <input type="text" autoFocus
                onKeyUp={e=>{
                    const val = e.target.value;

                    if(e.key === 'Enter'){ 
                        console.log('hi', val)
                        if (e.target.value === 'o') setGood('Opium')
                        if (e.target.value === 's') setGood('Silk')
                        if (e.target.value === 'a') setGood('Arms')
                        if (e.target.value === 'g') setGood('General')
                        }
                }
               }/>

            </>
             : ""}
            { good && amount === undefined ? 
            <>
                <p> How much {good} do you want to buy?  Enter number</p> 
                <input type="number" autoFocus
                onKeyUp={e=>{
                    if(e.key === 'Enter') {
                        setAmount(e.target.value)
                        dispatch(buyGoods({
                            good: good,
                            amount: e.target.value
                            })
                        )
                        setGood()
                        setAmount()
                        setModalOpen(false)
                    }
                }
                }/>
            </>
                :""}
            </>
        )
    }
    if (type === 'sell'){
        return (
            <>
            { good === undefined ? 
            <>
                <p> What do you want to sell?</p>
                <input type="text" autoFocus
                onKeyUp={e=>{
                    console.log(e.target.value)
                    if(e.key === 'Enter'){ 
                        console.log('hi')
                        if (e.target.value === 'o') setGood('Opium')
                        if (e.target.value === 's') setGood('Silk')
                        if (e.target.value === 'a') setGood('Arms')
                        if (e.target.value === 'g') setGood('General')
                        }
                }
               }/>
            </>
             : ""}
            { good && amount === undefined? 
            <>
            <p> How much {good} do you want to sell? Enter number</p>
            <input type="number" autoFocus
                onKeyUp={e=>{
                    if(e.key === 'Enter') {
                        setAmount(e.target.value)
                        dispatch(sellGoods({
                            good:good, 
                            amount:e.target.value
                            })
                        )
                        setGood('')
                        setAmount(0)
                        setModalOpen(false)
                    }
                }
                }/>
            </>
                :""}
            </>
        )
    }
    if (type === 'transfer'){
        return (
            <Transfer
                good={good}
                amount={amount}
                setAmount={setAmount}
                setGood={setGood}
                setModalOpen={setModalOpen}
            />
        )
    }


    if (type === 'bank'){
        return (
            <>
            {depositAmount === undefined ?
            <>
            <p> How much do you want to deposit?</p>
            <input type='number' autoFocus
            onKeyUp={e=>{
                if (e.key === 'Enter'){
                    setDepositAmount(e.target.value)
                    dispatch(deposit(e.target.value))
                }
            }}

            />
            </>
            : ""}

            {depositAmount && withdrawAmount === undefined?
            <>
            <p>How much do you want to withdraw?</p>
            <input type='number' autoFocus
            onKeyUp={e=>{
                if (e.key === 'Enter'){
                    setWithdrawAmount(e.target.value)
                    dispatch(withdraw(e.target.value))
                    setModalOpen(false)
                }
            }}
            />
            </>
            :""}
            </>
        )
    }


    if (type === 'quit'){
        return(
            <>
                <p>Where are we going?</p>
                <ol>
                {locations.map((location,i)=>
                    <li key={i}
                     style={{display:'inline-block'}}
                    >{i+1}. {location} </li>
                )}
                </ol>

                <input type="number" autoFocus 
                 min="1" max="6"
                onKeyUp={e=>{
                    if(e.key === "Enter"){
                        e.preventDefault();
                        clearTimeout(eventRef);
                        setEventLoading(true);
                        dispatch(addNextTurn(e.target.value -1))
                        generateRandEvent();
                        //set random variables?
                        eventRef();
                    }
                }}
                />
                {eventLoading ? <EventDisplay message={message}/> :""}
            </>
        )
    }

}


export default Transaction;