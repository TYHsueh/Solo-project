import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const DisplayAllListing = () => {
    const [allListings, setAllListings] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:8000/api/allProperties')
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
        <div>
            <div>
            <h4>Hi User, ready for a new space?</h4>
            </div>
            <div>
                <p>For Home</p>
                <table>
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
            <div>
                <p>For Business</p>
                <table>
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
    );
}

export default DisplayAllListing;
