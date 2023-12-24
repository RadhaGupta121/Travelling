import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Social from './Component/Social/Social';
import Profile from './Component/Profile/Profile';
import Home from './Component/Home/Home';
import Register from './Component/Register/Register';
import Login from './Component/Register/Login';
import BasicExample from './Component/Nav/BasicExample';
import TripHistory from './Component/Trips/TripHistory';
import UserConnection from './Component/Social/UserConnection';
import Welcome from './Component/Home/Welcome';
import TrendingTrip from '../src/Component/Trending Trip/TrendingTrip';
function App() {
  return (
   <>
   
   <BrowserRouter>
   <BasicExample/>
   <Routes>
          <Route path='/' element={<Welcome/>}/>
         <Route path='/network' element={<Social/>}/>
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/home' element={<Home/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/triphistory' element={<TripHistory/>}/>
         <Route path='/myconnection' element={<UserConnection/>}/>
         <Route path='/trendingtrip' element={<TrendingTrip/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
