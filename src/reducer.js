export const initialState = {
    basket: [],
    user: null
}

export const getBasketTotal = (basket) => {
    return basket?.reduce((a, cv) => Math.round((a + cv.price) * 100) / 100, 0)
}

const reducer = (state, action) => {
    //console.log(action)
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'DELETE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
            let tempBasket = [...state.basket]
            
            if (index >= 0) {
                tempBasket.splice(index, 1)
            } else {
                console.warn(
                    `Cannot delete product (id: ${action.id}) as it's not in the basket`
                )
            }
            return {
                ...state,
                basket: tempBasket
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer