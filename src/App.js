import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    console.log(cartList)
    const productExists = cartList.some(eachItem => eachItem.id === product.id)

    if (productExists) {
      const updatedCart = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      })
      this.setState({cartList: updatedCart})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCart = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredCart})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const increamentedQuantity = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })

    this.setState({cartList: increamentedQuantity})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const decreamentedQuantity = cartList
      .map(eachItem => {
        if (eachItem.id === id) {
          if (eachItem.quantity > 1) {
            return {...eachItem, quantity: eachItem.quantity - 1}
          }
          return null
        }
        return eachItem
      })
      .filter(eachItem => eachItem !== null)

    this.setState({cartList: decreamentedQuantity})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
