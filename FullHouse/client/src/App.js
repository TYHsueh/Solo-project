import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import DisplayAllListing from './components/DisplayAllListing';
import ListingForm from './components/ListingForm';
import Detail from './components/Detail';
import EditListing from './components/EditListing';
import Main from './views/Main';
import Test from './components/Test'
import MyAccount from './components/MyAccount';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path = '/' element ={<Main/>} />
          <Route path = '/test' element={<Test/>} />
          <Route path='/dashboard' element={<DisplayAllListing/>} />
          <Route path='/createListing' element={<ListingForm/>} />
          <Route path='/editListing/:id' element ={<EditListing/>} />
          <Route path='/viewListing/:id' element ={<Detail/>} />
          <Route path='/myAccount' element = {<MyAccount/>} />
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
