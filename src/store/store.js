import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import gameReducer from './gameSlice';
// import {listenerMiddleware} from './eventSlice'



export default configureStore({
  reducer: {
    game: gameReducer,

  },
  // middleware:  (getDefaultMiddleware) =>
  // getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})