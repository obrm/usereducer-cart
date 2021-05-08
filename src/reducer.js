const reducer = (state, action) => {
  switch (action.type) {
    case `LOADING`:
      return {
        ...state,
        loading: true,
      }
    case `DISPLAY_ITEMS`:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      }
    case `CLEAR_CART`:
      return {
        ...state,
        cart: [],
      }
    case `REMOVE_ITEM`:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    case `TOGGLE_AMOUNT`:
      let tempCart = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.type === 'increase') {
              return { ...item, amount: item.amount + 1 }
            }
            if (action.payload.type === 'decrease') {
              return { ...item, amount: item.amount - 1 }
            }
          }
          return item
        })
        .filter((item) => item.amount > 0)
      return { ...state, cart: tempCart }
    case `GET_TOTALS`:
      const { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem
          cartTotal.amount += amount
          const itemTotal = price * amount
          cartTotal.total += itemTotal
          return cartTotal
        },
        {
          total: 0,
          amount: 0,
        }
      )
      return { ...state, total: +total.toFixed(2), amount }
    default:
      return state
  }
}

export default reducer
