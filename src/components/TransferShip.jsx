

import { moveToShip} from '../store/gameSlice';
import { useDispatch } from 'react-redux';


const TransferShip = (props) =>{
    const {good, setGood, amount, setAmount, setModalOpen, setHoldDone} = props;
    const dispatch = useDispatch();


    return(
        <>
        <p> this is the ship prompts</p>
        {good === '' ?
            <>
            <p> What do you want to move to the ship?</p>
            <input type='text' autoFocus
                onKeyUp={e=>{
                    if(e.key === 'Enter'){ 
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
    
            {good && amount === 0 ?
            <>
                <p>How much {good} do you want to move to the ship? Enter number?</p>
                <input type="number" autoFocus
                onKeyUp={e=>{
                    if(e.key === 'Enter') {
                        setAmount(e.target.value)
                        dispatch(moveToShip({
                            good:good, 
                            amount:e.target.value
                            })
                        )
                        setGood('')
                        setAmount(0);
                        setHoldDone(true)
                        setModalOpen(false)
                    }
                }
                }/>
                </>
                :""}
            </>
    )
}

export default TransferShip;