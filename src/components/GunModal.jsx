import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {buyGuns} from '../store/gameSlice';

const GunModal = props =>{
    const dispatch = useDispatch();
    const {setGunModalOpen, cash} = props;
    const [message, setMessage] = useState('')
    let gunCost = Math.floor(Math.random()*(cash/2 -1) -1);

    const clearModal = ()=>{
        setTimeout(()=>{
            setGunModalOpen(false)
        },1500)
    }

    return(
        <>
        <p>Do you want to buy guns for ${gunCost} ? </p>
        <input autoFocus onKeyUp={ e=>{
            if (e.key === 'y'){
                dispatch(buyGuns(gunCost))
                setMessage(`you bought 1 gun for ${gunCost}`)
                clearModal();
            }else if (e.key === 'n'){
                setMessage(`you bought 0 gun `);
                clearModal();
            }else{
                return;
            }
        }
        }/>
        <p>{message}</p>
        </>
    )
}

export default GunModal;
