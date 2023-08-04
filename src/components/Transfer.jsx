import {useState} from 'react';
import { useDispatch } from "react-redux";
import { moveToCargo} from '../store/gameSlice';
import TransferShip from './TransferShip';

const Transfer = (props) =>{
    const {good, setGood, amount, setAmount, setModalOpen} = props;
    const dispatch = useDispatch();
    const [warehouseDone, setWareHouseDone] = useState(false);
    const [holdDone, setHoldDone] = useState(false);

    return (
        <>
        {good === undefined ? 
            <>
            <p> What do you want to move to warehouse?</p>
            <input type='text' autoFocus
                onKeyUp={e=>{
                    if(e.key === 'Enter' && e.target.value){ 
                        console.log('hi')
                        if (e.target.value === 'o') setGood('Opium')
                        if (e.target.value === 's') setGood('Silk')
                        if (e.target.value === 'a') setGood('Arms')
                        if (e.target.value === 'g') setGood('General')
                        }
                }}
            />
            </>
            :""}

            {good && amount === undefined ?
                <>
                <p>How much {good} do you want to move to the warehouse? Enter number.</p>
                <input type="number" autoFocus
                onKeyUp={e=>{
                    if(e.key === 'Enter' && e.target.value) {
                        setAmount(e.target.value)
                        console.log('bye')
                        dispatch(moveToCargo({
                            good: good, 
                            amount:e.target.value
                            })
                        )
                        setAmount(0)
                        setGood('')
                        setWareHouseDone(!warehouseDone)//                     
                    }
                }
                }/>
                </>
                :""}
            {!holdDone && warehouseDone ? 
            <TransferShip
                good={good}
                amount={amount}
                setGood={setGood}
                setAmount={setAmount}
                setHoldDone={setHoldDone}
                setModalOpen={setModalOpen}
            />
            : ""
            }
 
        </>
    
        )
}

export default Transfer;