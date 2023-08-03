import { useDispatch } from "react-redux";
import {GOODS, locations, buyGoods, sellGoods, addNextTurn,
    moveToShip, moveToCargo, deposit, withdraw
} from '../store/gameSlice';
import { useEffect, useState } from "react";


const Transaction = (props) =>{
    const {type} = props;
    const dispatch = useDispatch();

    useEffect(()=>{
        window.addEventListener('keyup', e=>{
            if (e.key === 'enter'){
                handleSubmit()
            }
        })
        return () => window.removeEventListener('keyup', e=>{
                if (e.key === 'enter'){
                    handleSubmit()
                }
            });
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (type === 'buy'){
            console.log(e.target[0].value, e.target[1].value )
            //dispatch buy shit
            const good = e.target[0].value;
            const amount = e.target[1].value
            dispatch(buyGoods({
                good: good, 
                amount:amount
            }))
            props.setModalOpen(false)
        }

        if (type === 'sell'){
            //dispatch sell shit
            const good = e.target[0].value;
            const amount = e.target[1].value;
            dispatch(sellGoods({
                good: good, 
                amount:amount
            }))
            props.setModalOpen(false)
        }
    }


    if (type === 'buy') {
        return (
            <>
            <p> We are shopping</p>
            <TransactionForm handleSubmit={handleSubmit}/>
            </>
        )
    }
    if (type === 'sell'){
        return(
            <>
            <p> We are selling</p>
            <TransactionForm handleSubmit={handleSubmit}/>
            </>
        )
    }
    if (type === 'transfer'){
        return (
            <>
            <p> we are transferring</p>
            <CargoForm setModalOpen={props.setModalOpen}/>
            </>
        )
    }
    if (type === 'bank'){
        return (
            <>
            <p> we are banking</p>
            <BankForm setModalOpen={props.setModalOpen}/>
            </>
        )
    }
    if (type === 'quit'){
        return(
            <>
            <p>We are traveling where are we going? </p>
            <select onChange={e =>{
                dispatch(addNextTurn(e.target.value))
                props.setModalOpen(false)
            }}
            >
            <option disabled selected value> -- select an option -- </option>
            {locations.map((location, i) =>
                <option key={location} value={i}>{location}</option>
            )}
            </select>
            </>
        )
    }
}

export default Transaction;


const TransactionForm = (props) =>{
    return(
    <>
    <form onSubmit={props.handleSubmit}>
        <select>
            {GOODS.map((good)=>{
                return <option key={good.name} value={good.name}>{good.name}</option>
            })}
        </select>
        <span></span>
        <label>amount</label><input type='number'/>
    </form>
    <button type='submit'>Submit</button> 
    </>

    )
}

const CargoForm = props =>{

    const [move, setMove] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
        const handleKey= ({key})=>{
            if (key === 'c'){
                setMove('c')
            }
            if (key === 's'){
                setMove('s')
            }
            if (key === 'enter'){
                handleSubmit();
            }
        }
        window.addEventListener('keyup',handleKey );
        return ()=> window.removeEventListener('keyup', handleKey)
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        const good = e.target[0].value
        const amount = e.target[1].value;
        if (move === 'w'){
            dispatch(moveToCargo({
                good: good, 
                amount:amount
            }))
        }
        if (move === 'h'){
            dispatch(moveToShip({
                good: good, 
                amount:amount
            }))
        }
        props.setModalOpen(false)
    }

    return(
        <>
        <p> Are you moving cargo to <b>w</b>arehouse or <b>h</b>old? </p>
        <form onSubmit={handleSubmit}>
        <select>
            {GOODS.map((good)=>{
                return <option key={good.name} value={good.name}>{good.name}</option>
            })}
        </select>
        <span></span>
        <label>amount</label><input type='number'/>
    </form>
    </>
    )
}

const BankForm = (props) =>{
    const [amount, setAmount] = useState(0);
    const [bTransaction, setBTransaction] = useState('');
    const dispatch = useDispatch();

   const handleSubmit = (e)=>{
        e.preventDefault();
        if (bTransaction === 'deposit'){
            dispatch(deposit(amount))
            props.setModalOpen(false)
        }
        if (bTransaction ==='withdraw'){
            dispatch(withdraw(amount))
            props.setModalOpen(false)
        }
   }

    return(
        <>
        <select onChange={e => setBTransaction(e.target.value)}> Do you want to withdraw or deposit?
            <option disabled selected value >Do you want to withdraw or deposit?</option>
            <option value="deposit"> deposit</option>
            <option value='withdraw'> withdraw</option>
        </select>
        <label>amount</label><input type='number' onChange={e=>setAmount(e.target.value)}/>
        <button type="submit" onClick={e =>handleSubmit(e)}>Submit</button>
    </>
    )
}