import React, { createContext, useContext, useReducer } from 'react'

// Prepare data layer
export const StateContext = createContext()

// Wrap app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

// Pull info from the data layer
export const useStateValue = () => useContext(StateContext)