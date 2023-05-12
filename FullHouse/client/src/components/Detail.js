import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const {id} = useParams();
    const [listing, setListing] = useState({});
    const navigate = useNavigate();
    //console.log(id);

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/allProperties/${id}`)
            .then((res) =>{
                console.log(res);
                setListing(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }, []);

    const deleteHandler =(id) =>{
        axios.delete(`http://localhost:8000/api/allProperties/${id}`)
            .then((res) =>{
                console.log(res)
                navigate('/dashboard')

            })
            .catch((err) =>{
                console.log(err)
            })
    };

    return (
        <div>
            <div>
                <h3>{listing.address} <br/> {listing.city}, {listing.state}, {listing.zipcode} <br/>  </h3>
                <h3>${listing.price} / month</h3>
                <p>SqFt: {listing.sqft}  Bed: {listing.bed} Bath: {listing.bath} </p>
                <p>Description: {listing.desc}</p>
            </div>
            <div>
                <button>Request</button>
                <br/>
                <Link to={`/editListing/${listing._id}`} >Edit</Link>
                <button onClick={() =>deleteHandler(listing._id)} >Delete</button>
            </div>

        </div>
    );
}

export default Detail;
