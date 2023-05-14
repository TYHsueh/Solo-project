import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';


const Main = () => {
    return (
        <div className='row' style={{justifyContent:"space-around", padding:"50px"}}>
            <div className='col-3'><Register/></div>
            <div className='col-3'><Login /></div>
            
        </div>
    );
}

export default Main;
