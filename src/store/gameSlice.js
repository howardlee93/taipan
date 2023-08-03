import { createSlice, current } from "@reduxjs/toolkit";

//helpers 
export const locations = ['Hong Kong','Shanghai','Nagasaki','Manilla','Singapore','Ceylon']

export const GOODS = [
    {
      name:'General',
      salesRange: [5, 23],
      illegal:false
    },
    {
      name:'Arms',
      salesRange: [1, 220],
      illegal:false
    },
    {
      name:'Silk',
      salesRange: [500, 5000],
      illegal:false
    },
    {
      name:'Opium',
      salesRange: [1000, 56000],
      illegal:true
    }
  
  ];


const gameSlice = createSlice({
    name:'game',
    initialState:{
        year:1860,
        quarter:'spring',
        name:'',
        location:'Hong Kong',
        turn: 0,
        cash:0,
        bank:0,
        // debt:0,
        ship:{
          status: 100,
          holdSize: 60,
          hold:
            GOODS.map(good => {
            return {
              name:good.name, 
              amount : 0}
            })
          ,
          guns:0,
        },
        prices: GOODS.map(good => {
            let price = Math.floor((good.salesRange[1] - good.salesRange[0]) * Math.random());
            return {
              name: good.name,
              price: price
            }
          }),
        //map prices 
        cargo: GOODS.map(good => {
          return { 
            name: good.name,
            amount: 0}
          }),
        
    },
    reducers:{
        addName: (state, action) => {
            state.name = action.payload
        },
        addNextTurn: (state, action)=>{
            const quarters = ['spring','summer','fall','winter'];
            state.turn++;
            state.year += Math.floor(state.turn / 4 );
            state.quarter = quarters[state.turn % 4];
            const location = locations[action.payload];
            state.location = location
            //reset prices 
            state.prices = GOODS.map(good => {
            let price = Math.floor((good.salesRange[1] - good.salesRange[0]) * Math.random());
            return {
              name: good.name,
              price: price
            }
          })

        },
        setStartOptions: (state, action) =>{
          console.log(action.payload)
          switch(action.payload){
            case '1':
              state.cash += 5000;
              // state.debt -= 5000;
              break;
            case '2':
              state.ship.guns += 5;
              state.ship.holdSize -= 50;
              break;
          }
        },

        buyGoods: (state, action)=>{
          const {good, amount} = action.payload;
          const goodToBuy = state.prices.find(price => price.name === good)
          const moneySpent = goodToBuy.price * amount;

          if (moneySpent <= state.cash && amount <= state.ship.holdSize ){
            state.cash -= moneySpent;
            state.ship.holdSize -= Number(amount);
            const shipGood = state.ship.hold.find(sgood => sgood.name === good)
            console.log(current(shipGood), shipGood.amount)
            shipGood.amount += Number(amount);
          }
        },

        sellGoods :(state, action ) =>{
          const {good, amount} = action.payload;
          const currentGoodPrice = state.prices.find(price => price.name === good)
          const moneyToEarn = currentGoodPrice.price * amount;
          const shipGood = state.ship.hold.find(sgood => sgood.name === good)
          if ( amount <= shipGood.amount ){
            state.cash += moneyToEarn;
            state.ship.holdSize += Number(amount);
            shipGood.amount -= Number(amount);
          }
        },
        moveToCargo: (state, action)=>{
          const {good, amount} = action.payload;
          const shipGood = state.ship.hold.find(sgood => sgood.name === good);
          const cargoGood = state.cargo.find(cgood => cgood.name === good);

          if (amount <= shipGood.amount){
            state.ship.holdSize += Number(amount);
            shipGood.amount -= Number(amount);
            cargoGood.amount += Number(amount);
          }
        },
         
        moveToShip: (state, action) =>{
          const {good, amount} = action.payload;
          const shipGood = state.ship.hold.find(sgood => sgood.name === good);
          const cargoGood = state.cargo.find(cgood => cgood.name === good);
          
          if (amount <= cargoGood.amount){
            state.ship.holdSize -= Number(amount);
            shipGood.amount += Number(amount);
            cargoGood.amount -= Number(amount);
          }
        },

        deposit: (state, action) =>{
          state.bank += Number(action.payload);
          state.cash -= Number(action.payload);
        },

        withdraw:( state, action) =>{
          state.bank -= Number(action.payload);
          state.cash += Number(action.payload);
        },
        addMoney: (state, action)=>{
          state.cash += Number(action.payload);
        },
        damageShip:(state, action)=>{
          state.ship.status -= Number(action.payload);
        },
        blownPort: (state, action) =>{
          const location = locations[action.payload];
          state.debt = location;
        },
        upgradeShip: (state, action) =>{
          state.ship.status = 100;
          state.ship.holdSize += 50;
          state.cash -= Number(action.payload);
        },
        buyGuns: (state, action) =>{
          state.ship.guns++;
          state.cash -= Number(action.payload)
        },
        tax: ( state, action) =>{
          state.cash -= Number(action.payload)
        },
        fine: (state, action) =>{
          const opium = state.ship.hold.find(elem => elem.name === 'Opium');
          opium.amount = 0;
          state.cash -= Number(action.payload)
        }

    },
   
});




export const {addName, addNextTurn, setStartOptions, buyGoods, sellGoods,
  deposit, withdraw, moveToCargo, moveToShip,
  addMoney, damageShip, blownPort, buyGuns, upgradeShip, tax, fine
} = gameSlice.actions;
export default gameSlice.reducer;