import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItemsCount = cartList.length
      const cartTotal = cartList.reduce(
        (total, eachItem) => total + eachItem.price * eachItem.quantity,
        0,
      )

      return (
        <div className="cart-summary-container">
          <h1 className="order-heading">
            Order Total:{' '}
            <span className="order-span-element">Rs {cartTotal}</span>
          </h1>
          <p className="order-count">{cartItemsCount} items in Cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
