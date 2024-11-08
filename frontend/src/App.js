
import './App.css';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Home from './components/Home';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {HelmetProvider} from "react-helmet-async";
import Login from './components/user/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/user/Register';
import {loadUser} from './actions/userActions';
import { useEffect, useState } from 'react';
import store from './store';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Payment from './components/orders/Payment.js';
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import BookingForm from './components/booking/BookingForm.js';
import { getVehicles } from './actions/vehicleActions.js';
import PaymentPayNowQr from './components/orders/PaymentPayNowQr.js';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('')
  useEffect(() => {

    store.dispatch(loadUser);
    store.dispatch(getVehicles);

    async function getStripeApiKey() {
      try {
        const {data} = await axios.get('api/v1/stripeapi');
        setStripeApiKey(data.stripeApiKey);  
      } catch (error) {
        console.log("Stripe key get axios Error : ", error)
      }
      
      
    }
    

    getStripeApiKey()
    // console.log('stripeApiKey : ', stripeApiKey)

  }, [])

  return (
    <Router>
    <div className="App">
      <HelmetProvider>
      <Header/>
      <ToastContainer theme="dark"/>
      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/myprofile' element={ <ProtectedRoute> <Profile/> </ProtectedRoute> } />
        <Route path='/myprofile/update' element={ <ProtectedRoute> <UpdateProfile/> </ProtectedRoute> } />
        <Route path='/myprofile/update/password' element={ <ProtectedRoute> <UpdatePassword/> </ProtectedRoute> } />
        <Route path='/password/forgot' element={  <ForgotPassword/> } />
        <Route path='/password/reset/:token' element={  <ResetPassword/> } />
        <Route path='/booknow' element={ <ProtectedRoute> <BookingForm/> </ProtectedRoute>  } />
        
        { stripeApiKey && <Route path='/payment' 
        element={ <ProtectedRoute> <Elements stripe={loadStripe(stripeApiKey)}> <Payment/> </Elements> </ProtectedRoute> } />
        }
        { stripeApiKey && <Route path='/paymentqr' 
        element={ <ProtectedRoute> <Elements stripe={loadStripe(stripeApiKey)}> <PaymentPayNowQr/> </Elements> </ProtectedRoute> } />
        }
      </Routes>
      <Footer />
      </HelmetProvider>
    </div>
    </Router>
  );
}

export default App;
