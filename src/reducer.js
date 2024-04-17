const reducer = (state, action) => {
    if (action.type === 'LOGGED_SIGNED') {
        return { ...state, isLogged: true }
    }
    if (action.type === 'UNLOGGED_UNSIGNED') {
        return { ...state, isLogged: false }
    }
    if (action.type === 'SHOW_LOGIN') {
        return { ...state, isLogin: true }
    }
    if (action.type === 'DONT_SHOW_LOG') {
        return { ...state, isLogin: false }
    }
    if (action.type === 'SHOW_SIGNUP') {
        return { ...state, isSignUp: true }
    }
    if (action.type === 'DONT_SHOW_SIGNUP') {
        return { ...state, isSignUp: false }
    }
    if (action.type === 'INCREASE') {
        const increasedAmount = state.menuItems.map((item) => {
            if (item.id === action.payload) {
                return { ...item, amount: item.amount + 1 }
            }
            return item
        }
        )
        return { ...state, menuItems: increasedAmount }
    }
    if (action.type === 'DECREASE') {
        const decreasedAmount = state.menuItems.map((item) => {
            if (item.id === action.payload) {
                if (item.amount === 0) {
                    return { ...item, amount: 0 }
                }
                return { ...item, amount: item.amount - 1 }
            }
            return item
        }
        )
        return { ...state, menuItems: decreasedAmount }
    }
    if (action.type === 'CLEAR_ORDER') {
        return { ...state, ordered: [], total: 0 }
    }
    if (action.type === 'ADD_ORDER') {
        const newOrder = [...state.ordered, action.payload];
        return { ...state, ordered: newOrder }
    }
    if (action.type === 'REMOVE_ORDER') {
        const newRemovedOrder = [...state.ordered];
        const indexToRemove = newRemovedOrder.findIndex(item => item.name === action.payload);
        newRemovedOrder.splice(indexToRemove, 1);
        return { ...state, ordered: newRemovedOrder }
    }
    if (action.type === 'TOTAL') {
        let added = state.ordered.reduce((all, item) => {
            const { price, amount } = item
            const multiplyAmountAndPrice = amount * price
            return all + multiplyAmountAndPrice;
        }, 0)
        return { ...state, total: added }
    }
    if (action.type === 'ASSIGN_ERROR') {
        return { ...state, otherErrors: action.payload }
    }
    if (action.type === 'CLEAR_ERROR') {
        return { ...state, otherErrors: '', signError: '' }
    }

    if (action.type === 'ASSIGN_SIGN_ERROR') {
        return { ...state, signError: action.payload }
    }
}

export default reducer