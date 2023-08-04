import {useDispatch} from 'react-redux';
import {buyGoods, sellGoods}  from '../store/gameSlice';


const BuySellForm = props =>{

    const {good, amount, setAmount, setGood, type, setModalOpen} = props;
    const dispatch = useDispatch();
    
    return (
        <>
        { good === undefined ? 
        <>
            <p> What do you want to buy?</p>
            <input type="text" autoFocus
            onKeyUp={e=>{
                const val = e.target.value;

                if(e.key === 'Enter' && e.target.value){ 
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
                if(e.key === 'Enter' && e.target.value) {
                    setAmount(e.target.value)

                    if (type === 'buy'){
                        dispatch(buyGoods({
                            good: good,
                            amount: e.target.value
                            })
                        )
                    }
                    if (type === 'sell'){
                        dispatch(sellGoods({
                            good: good,
                            amount: e.target.value
                            })
                        )
                    }
        
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

export default BuySellForm;