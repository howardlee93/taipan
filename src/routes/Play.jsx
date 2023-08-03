import {useEffect, useState} from 'react';
import Game from '../components/Game';
import { useDispatch } from 'react-redux';
import {addName, setStartOptions} from '../store/gameSlice';

const Play = ()=> {

    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [shipOption, setShipOption] = useState();
    const [nameReady, setNameReady] = useState(false);
    const [shipOptionReady, setShipOptionReady] = useState(false);
    
    useEffect(()=>{
        console.log(shipOption);
    },[shipOption])

    const handleSetName = e =>{
        if (e.key === 'Enter'){
            setName(e.target.value);
            dispatch(addName(e.target.value));
            setNameReady(true)
        }
    }

    const handleSetShipOption = e =>{
        if (e.key === 'Enter'){
            setShipOption(e.target.value);
            dispatch(setStartOptions(e.target.value));
            setShipOptionReady(true);
        }
    }

    return(
        <>
        {  (shipOptionReady && nameReady) ?
        
           (
            <Game />
           )
           :   ( 
            <div id='question'>
            <h1>What is your name?</h1>
            <input type='text' name="player-name" onChange={e=>setName(e.target.value)}
            onKeyDown={e =>handleSetName(e)}
            />

            <h1> Do you want to start with:</h1>
                <ul>
                    <li> 1. Cash and debt? ($5000)</li>
                    <li> 2. Five guns (and no cash)</li>
                    <input type="text" name="player-start-option" 
                    onChange={e=>setShipOption(e.target.value)}
                    onKeyDown={handleSetShipOption}
                    />
                </ul>
            </div>
           )
        
        }
        </>
    )
}

export default Play;