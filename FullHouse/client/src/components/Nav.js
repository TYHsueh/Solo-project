import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
    const {username, setUsername} = props;
    useEffect(() => {
        // using the info we store in localstorage to set State for displaying info or other use
        setUsername(localStorage.getItem("firstName"));
    }, [])
            // using the info we store in localstorage to set State for displaying info or other use
            //setUsername(localStorage.getItem("firstName"));

    const navigate = useNavigate();
    const logout=()=>{
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) =>{
                localStorage.clear();//clear localStorage
                setUsername(""); //set username back to blank 
                console.log(res);
                navigate('/');
            })
            .catch((err) =>{
                console.log(err)
            })
    }
    return (
        
        <div className='row' style={{padding:"20px", backgroundImage:"linear-gradient(navy, grey)"}}>
            <div className='col-7' style={{paddingLeft:"150px", textAlign:"left"}}>
                <h1 style={{color:"white"}}>FullHouse</h1>
                <h3>Winning in finding dream spaces</h3>
            </div>
            <div className='col-1 text-white'>
                {
                    username?
                    <p> Hi {username}</p>:
                    <p>Please login</p>
                }
            </div>
            <div className='nav nav-justified col-4' style={{alignItems:"center"}}>
                
                <Link to={'/dashboard'} className='nav-link'>Dashboard</Link>
                <Link to={'/createListing'} className='nav-link'>Create Your Own Listing</Link>
                <Link to={'/myAccount'} className='nav-link'>My Acoount</Link>
                <button onClick={logout} style={{color:"white", background:"red"}} >Logout</button>
            </div>
            
        </div>
    );
}

export default Nav;
