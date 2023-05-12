import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav from './components/Nav';
import DisplayAllListing from './components/DisplayAllListing';
import ListingForm from './components/ListingForm';
import Detail from './components/Detail';
import EditListing from './components/EditListing';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/dashboard' element={<DisplayAllListing/>} />
          <Route path='/createListing' element={<ListingForm/>} />
          <Route path='/editListing/:id' element ={<EditListing/>} />
          <Route path='/viewListing/:id' element ={<Detail/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
