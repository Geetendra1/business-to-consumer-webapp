import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer,productDetailsReducer, productSaveReducer,productDeleteReducer,productAdminListReducer} from "./reducer/productReducers";
import Cookie from "js-cookie"
import {cartReducer} from './reducer/cartReducers';
import thunk from 'redux-thunk';
import {userSigninReducer, userRegisterReducer,userUpdateReducer} from './reducer/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from './reducer/orderReducers.js';const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;


const initialState = {cart : {cartItems, shipping:{},payment:{}}, userSignin:{userInfo}}

const reducer = combineReducers({
    productList : productListReducer,
    productAdminList:productAdminListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay: orderPayReducer,
    userUpdate: userUpdateReducer,
    myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhanser(applyMiddleware(thunk)))

export default store;