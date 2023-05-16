import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email:"",
        password:""
    });
    const [errors, setErrors] = useState({});
    const changeHandler =(e) =>{
        setUserLogin({...userLogin, [e.target.name]:e.target.value})
    };
    const submitHandler = (e) =>{
        e.preventDefault();
        //{withCredentials:true}: allow us to generate useToken/cookies from the back end
        axios.post('http://localhost:8000/api/login', userLogin, {withCredentials:true})
            .then((res) =>{
                console.log(res);
                navigate('/dashboard');
            })
            .catch((err) =>{
                console.log(err);
                setErrors(err.response.data);
            })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label className='form-label'>Email:</label>
                    <input className='form-control' type="text" name="email" onChange={changeHandler} value={userLogin.email} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label className='form-label'>Password:</label>
                    <input className='form-control' type="password" name="password" onChange={changeHandler} value={userLogin.password} />
                    {
                        errors ?
                            <p style={{ color: "red" }} >{errors.message}</p> :
                            null
                    }
                </div>
                <div>
                    <input type="submit" value="Login" className='btn btn-secondary' style={{ margin: "10px"}} />
                </div>
            </form>
            <p style={{color:"DodgerBlue"}}>Do not have an account? Create one!</p>
        </div>
    );
}

export default Login;
