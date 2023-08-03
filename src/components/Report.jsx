import styles from './Game.module.css';
import { useSelector, useDispatch } from "react-redux";
import {fine, tax} from '../store/gameSlice';
import { useEffect, useState } from 'react';
import Transaction from './Transaction';
import GunModal from './GunModal';

const Report =(props)=>{
    const dispatch = useDispatch();
    const cash = useSelector(state => state.game.cash);
    const bank = useSelector(state => state.game.bank);
    const prices = useSelector(state => state.game.prices);
    const turn = useSelector(state => state.game.turn);
    const ship = useSelector(state => state.game.ship);
    const {location} = props;

    const [transactionType, setTransactionType] = useState();
    const [ modalOpen, setModalOpen] = useState(false);
    const [gunModalOpen, setGunModalOpen] = useState(false);

    useEffect(()=>{
        const handleKeyUp = ({key})=>{
            if (key === 'q'){
                setTransactionType('quit')
                setModalOpen(true);
            }
            if (key === 'b'){
                setTransactionType('buy'); 
                setModalOpen(true)
            }
            if (key === 's'){
                setTransactionType('sell');
                setModalOpen(true); 
            }
            if (key === 't'){
                setTransactionType('transfer');
                setModalOpen(true); 
            }
            if (key === 'v'){
                setTransactionType('bank');
                setModalOpen(true);
            }
            if (key === 'f'){
                setTransactionType('fix');
                setModalOpen(true);
            }
        };
        document.addEventListener('keyup', handleKeyUp)
        return ()=> document.removeEventListener('keyup', handleKeyUp)
    },)

    const randEvent = ()=>{
        let chance = Math.floor((100-1) * Math.random() - 1);
        if (cash > 30000) chance +=20;
        if (ship.hold.find(elem => elem.name === 'Opium' && elem.amount > 0) ) chance +=20;
        
        if (chance  >= 90 ){
            let taxAmount = Math.floor(Math.random()*(cash/2 -1) -1);
            dispatch(tax(taxAmount));
            alert(`you got taxed ${taxAmount}`)
        }
        
        if (chance > 80 && chance < 90){
            let fineAmount = Math.floor(Math.random()*(cash/2 -1) -1);
            dispatch(fine(fineAmount))
            alert(`you got fined ${fineAmount} and all your opium seized`)
        }
        if (chance > 60 && chance <=80){
            setGunModalOpen(true)
        } 

    }
    useEffect(()=>{
        //always option to fix
        if (turn >= 1){
        randEvent()
        // setGunModalOpen(true)
         console.log( `got to ${location}`)
        }
    }, [location, turn]);

    return(
        <> 
        cash: ${Math.floor(cash)} bank: ${Math.floor(bank)}
        <div id="report">
        Report
        <p>Prices:</p>
        {prices.map((price) =>{
            return (<p key={price.name}>{price.name} : {price.price}</p>)
        })}
        
        {location === 'Hong Kong' ? 
            <p>Should I <b>buy</b>, <b>sell</b>, <b>visit bank</b>, <b> fix ship</b>, <b>transfer cargo</b>, or <b>quit turn?</b> </p>
        
        :
        <p>Should I <b>buy</b>, <b>sell</b>, or <b>quit turn?</b></p>
        }
        {gunModalOpen ? <GunModal cash={cash} setGunModalOpen={setGunModalOpen}/> : ""}
        {modalOpen ? 
        <Transaction 
        setModalOpen={setModalOpen}
        type={transactionType}/>
        :""
        }
       
        </div>
        </>
    )
}

export default Report;