import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Test = (props) => {
    const {userEmail, setUserEmail} = props;
    const navigate= useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/${userEmail}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);
    

    const logout=()=>{
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) =>{
                console.log(res);
                navigate('/');
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    return (
        <div>
            <p>{}</p>
            test
            <br/>
            <button onClick={logout} >Logout</button>
        </div>
    );
}

export default Test;
