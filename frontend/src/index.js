import { React } from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import PrivateRoute from './components/PrivateRoute';
import reportWebVitals from './reportWebVitals';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route path='/product/:id' element={<ProductScreen />} />
			<Route path='/cart' element={<CartScreen />} />
			<Route path='/login' element={<LoginScreen />} />
			<Route path='/register' element={<RegisterScreen />} />

			<Route path='' element={<PrivateRoute />}>
				<Route path='/shipping' element={<ShippingScreen />} />
				<Route path='/payment' element={<PaymentScreen />} />
				<Route path='/placeorder' element={<PlaceOrderScreen />} />
				<Route path='/order/:id' element={<OrderScreen />} />
			</Route>
		</Route>
	)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);

reportWebVitals();
