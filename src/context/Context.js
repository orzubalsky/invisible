import React, { createContext, useContext, useReducer } from 'react'
import { APP_STATES } from 'utils/constants'


const AppStateContext = createContext()

const AppDispatchContext = createContext()

const AppProvider = ({ children, initialState }) => {
  const initialData = {
    appState: APP_STATES.IDLE,
    isAboutVisible: false,
    isContributeVisible: false,
    isLoaded: false,
    items: null,
    selectedId: null
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setAppState': {
        if (!Object.values(APP_STATES).includes(action.payload)) return state

        return {
          ...state,
          appState: action.payload,
          isContributeVisible: action.payload === APP_STATES.CONTRIBUTING,
          selectedId: null
        }
      }

      case 'setIsAboutVisible': {
        return {
          ...state,
          isAboutVisible: action.payload
        }
      }

      case 'setIsContributeVisible': {
        return {
          ...state,
          isContributeVisible: action.payload
        }
      }

      case 'setItems': {
        const items = action.payload.sort((a, b) => a.number - b.number)

        return {
          ...state,
          isLoaded: true,
          items
        }
      }

      case 'setSelectedId': {
        if (!action.payload) return state

        return {
          ...state,
          selectedId: action.payload
        }
      }

      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }

  const [ state, dispatch ] = useReducer(reducer, { ...initialData, ...initialState })

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

const useState = () => {
  const context = useContext(AppStateContext)

  if (context === undefined) throw new Error(`useState must be used within a Provider`)

  return context
}

const useDispatch = () => {
  const context = useContext(AppDispatchContext)

  if (context === undefined) throw new Error(`useDispatch must be used within a Provider`)

  return context
}

export { AppProvider, useState, useDispatch }
