import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const DisplayAllListing = (props) => {
    const [allListings, setAllListings] = useState([]);
    const {username, setUsername} = props;

    useEffect(() =>{
        // using the info we store in localstorage to set State for displaying info or other use
        setUsername(localStorage.getItem("firstName"));

        axios.get('http://localhost:8000/api/allProperties', {withCredentials:true})
            .then((res) =>{
                console.log(res);
                setAllListings(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }, []);
    const allListingsR = allListings.filter((listing) =>listing.type === "residential")
    const allListingsC = allListings.filter((listing) =>listing.type === "commercial")


    return (
        <div className='container'>
            <h3>Hi {username}</h3>
            <div style={{margin:"50px"}}>
            <h4>Hi Winner, ready for a new space?</h4>
            </div>
            <div  className='row' style={{display:"flex", justifyContent:"space-evenly"}}>
            <div className='col-5' style={{border:"solid 2px grey"}}>
                <h4>For Home</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Price/mo</th>
                            <th>SqFt</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allListingsR.map((listing) =>(
                                <tr key={listing._id}>
                                    <td>{listing.city}</td>
                                    <td>{listing.price}</td>
                                    <td>{listing.sqft}</td>
                                    <td>
                                        <Link to={`/viewListing/${listing._id}`}>view</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='col-5'  style={{border:"solid 2px grey"}}>
                <h4>For Business</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Price/mo</th>
                            <th>SqFt</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allListingsC.map((listing) =>(
                                <tr key={listing._id}>
                                    <td>{listing.city}</td>
                                    <td>{listing.price}</td>
                                    <td>{listing.sqft}</td>
                                    <td>
                                        <Link to={`/viewListing/${listing._id}`}>view</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}

export default DisplayAllListing;
