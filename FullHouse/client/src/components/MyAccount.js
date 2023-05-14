import React, {useEffect, useState}  from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const MyAccount = () => {
    const navigate = useNavigate();

    const [myListings, setMyListings] = useState([]);
    useEffect(() =>{
        axios.get('http://localhost:8000/api/myListings', {withCredentials:true})
        .then((res) =>{
            console.log(res);
            setMyListings(res.data)
        })
        .catch((err) =>{
            console.log(err);
        })
    }, []);

    const deleteHandler =(id) =>{
        axios.delete(`http://localhost:8000/api/allProperties/${id}`, {withCredentials:true})
            .then((res) =>{
                console.log(res)
                const updatedMyListings = myListings.filter((listing)=>listing._id !== id)
                setMyListings(updatedMyListings);
            })
            .catch((err) =>{
                console.log(err)
            })
    };



    return (
        <div style={{padding:"20px"}}>
            <div style={{margin:"20px", textAlign:"left"}}><h3>All Your Listings</h3></div> 
            <table className='table'>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>City</th>
                            <th>Price/mo</th>
                            <th>SqFt</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myListings.map((listing) =>(
                                <tr key={listing._id}>
                                    <td>{listing.type}</td>
                                    <td>{listing.city}</td>
                                    <td>{listing.price}</td>
                                    <td>{listing.sqft}</td>
                                    <td>
                                        <Link to={`/viewListing/${listing._id}`}>view</Link> <span> </span>
                                        <Link to={`/editListing/${listing._id}`} >Edit</Link> <span> </span>
                                        <button onClick={() =>deleteHandler(listing._id)} className='btn btn-outline-danger' >Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    );
}

export default MyAccount;
