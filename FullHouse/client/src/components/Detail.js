import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const {id} = useParams();
    const [listing, setListing] = useState({});
    const navigate = useNavigate();
    //console.log(id);

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/allProperties/${id}`, {withCredentials:true})
            .then((res) =>{
                console.log(res);
                setListing(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }, []);

    // const deleteHandler =(id) =>{
    //     axios.delete(`http://localhost:8000/api/allProperties/${id}`, {withCredentials:true})
    //         .then((res) =>{
    //             console.log(res)
    //             navigate('/dashboard')

    //         })
    //         .catch((err) =>{
    //             console.log(err)
    //         })
    // };

    return (
        <div style={{margin:"30px"}}>
            <div>
                <h3>{listing.address} <br/> {listing.city}, {listing.state}, {listing.zipcode} <br/>  </h3>
                <h3>${listing.price} / month</h3>
                <p>Type: {listing.type}</p>
                <p>SqFt: {listing.sqft}  Bed: {listing.bed} Bath: {listing.bath} </p>
                <p>Description: <br/> {listing.desc}</p>
            </div>
            <div>
                <Link to={'/dashboard'}>Back</Link>
                
            </div>

        </div>
    );
}

export default Detail;
