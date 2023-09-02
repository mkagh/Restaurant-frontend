import React, { useContext, useReducer } from 'react'
import reducer from './reducer'
import { items } from "./data";

const AppContext = React.createContext()

const initialState = {
    isLogged: false,
    isLogin: false,
    isSignUp: false,
    menuItems: items,
    amount: 0,
    ordered: [],
    orderByMember: ["nesto"],
    total: 0,
    signError: "",
    otherErrors: ""
}


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const loggedSigned = () => {
        dispatch({ type: 'LOGGED_SIGNED' })
    }
    const unloggedUnsigned = () => {
        dispatch({ type: 'UNLOGGED_UNSIGNED' })
    }
    const showLog = () => {
        dispatch({ type: 'SHOW_LOGIN' })
    }
    const dontShowLog = () => {
        dispatch({ type: 'DONT_SHOW_LOG', })
    }
    const showSignup = () => {
        dispatch({ type: 'SHOW_SIGNUP' })
    }
    const dontShowSignup = () => {
        dispatch({ type: 'DONT_SHOW_SIGNUP', })
    }
    const Increase = (id) => {
        dispatch({ type: 'INCREASE', payload: id })

    }
    const Decrease = (id) => {
        dispatch({ type: 'DECREASE', payload: id })


    }
    const clearOrder = () => {
        dispatch({ type: 'CLEAR_ORDER' })


    }
    const NewOrder = (id) => {
        dispatch({ type: 'ADD_ORDER', payload: id })


    }
    const removeOrder = (id) => {
        dispatch({ type: 'REMOVE_ORDER', payload: id })


    }
    const getTotal = () => {
        dispatch({ type: 'TOTAL' })


    }
    const assignotherError = (err) => {
        dispatch({ type: 'ASSIGN_ERROR', payload: err })


    }
    const clearError = (err) => {
        dispatch({ type: 'CLEAR_ERROR' })


    }
    const assignSignError = (err) => {
        dispatch({ type: 'ASSIGN_SIGN_ERROR', payload: err })


    }
    return (
        <AppContext.Provider value={{
            ...state,
            showLog,
            showSignup,
            dontShowLog,
            dontShowSignup,
            Increase,
            Decrease,
            NewOrder,
            removeOrder,
            getTotal,
            loggedSigned,
            unloggedUnsigned,
            clearOrder,
            assignotherError,
            clearError,
            assignSignError

        }} >
            {children}

        </AppContext.Provider >
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }