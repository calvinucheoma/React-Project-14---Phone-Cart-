import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const initialState = {
    loading:false,
    cart:cartItems,
    total:0,
    amount:0,
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }

  const removeItem = (id) => {
    dispatch({type: 'REMOVE',payload:id})
  }

  const increaseItem = (id) => {
    dispatch({type:'INCREASE', payload:id})
  }
// We can either use the increaseItem and decreaseItem functions in our code or the toggleAmount function which is just a simpler way to combine both functions
  const decreaseItem = (id) => {
    dispatch({type:'DECREASE', payload:id})
  }

  const fetchData = async () => {
    dispatch({type:'LOADING'});
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type:'DISPLAY_ITEMS', payload:cart})
  }

  const toggleAmount = (id,type) => { //type is for whether we want to increase or decrease
    dispatch({type:'TOGGLE_AMOUNT', payload:{id,type}})
  }

  useEffect(()=> {
    fetchData()
  },[])

  useEffect (() => {
     dispatch({type: 'GET_TOTAL'})
  },[state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
