import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductListReducers,
  ProductDetailsReducers,
  ProductDeleteReducers,
} from "./reducers/productReducers.js";
import { cartReducers } from "./reducers/cartReducers";
import {
  userLoginReducers,
  userRegisterReducers,
  userDetailsReducers,
  userUpdateProfileReducers,
  userListReducers,
  userDeleteReducers,
  userUpdateReducers
} from "./reducers/userReducers";
import { 
  orderCreateReducers, 
  orderDetailsReducers,
  orderPayReducers,
  orderListMyReducers,
} from './reducers/orderReducers'


const reducer = combineReducers({
  productList: ProductListReducers,
  productDetails: ProductDetailsReducers,
  productDelete: ProductDeleteReducers,
  cart: cartReducers,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
  userList: userListReducers,
  userDelete:userDeleteReducers,
  userUpdate:userUpdateReducers,
  orderCreate: orderCreateReducers,
  orderDetails:orderDetailsReducers,
  orderPay: orderPayReducers,
  orderListMy:orderListMyReducers,


});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};


const initialState = {
  cart:
   { cartItems: cartItemsFromStorage,
     shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
