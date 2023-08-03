
import { useEffect, useState } from 'react';
import {upgradeShip} from '../store/gameSlice';
import { useDispatch } from 'react-redux';

const FixForm = (props) =>{
    const dispatch = useDispatch();
    const {cash} = props;
    const [cost, setCost] = useState();
    const randomCost = ()=>{
        return Math.floor(Math.random()*(cash/2 -1) +1)
    }

    useEffect(()=>{
        let randC = randomCost();
        setCost(randC);
    },[])

    return (
        <div>
            <p> Do you want to fix and add 50 spaces to your ship for ${cost}?</p>
            <input type="text" autoFocus
            onKeyUp={e=>{
                if (e.key ==='Enter' && e.target.value === 'y'){
                    dispatch(upgradeShip(cost));
                    props.setModalOpen(false);
                }else if (e.key ==='Enter' && e.target.value === 'n'){
                    props.setModalOpen(false);
                }else{
                    return;
                }
            }}
            />
        </div>
    )

}

export default FixForm;
