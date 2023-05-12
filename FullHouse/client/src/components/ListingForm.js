import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const ListingForm = () => {

    const navigate = useNavigate();
    const [listing, setListing] = useState({
        type:"",
        price:"",
        address:"",
        city:"",
        state:"",
        zipcode:10000,
        sqft:"",
        bed:"",
        bath:"",
        desc:""
    });
    const [errors, setErrors] = useState({});

    const changeHandler = (e)=>{
        setListing({...listing, [e.target.name]:e.target.value})
    };

    const submitHandler= (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/newProperty', listing)
            .then((res) =>{
                console.log(res)
                navigate('/dashboard')
            })
            .catch((err)=>{
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }


    return (
        <div>
            <form onSubmit={submitHandler} >
                <div>
                    <label>Type:</label>
                    <select name="type" onChange={changeHandler} value={listing.type}>
                    <option value=""> </option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    </select>
                    {
                        errors.type ?
                            <p style={{ color: "red" }}>{errors.type.message}</p> :
                            null
                    }
                </div>
                <div>
                    <label>Price/mo</label>
                    <input type="number" name="price" onChange={changeHandler} value={listing.price} />
                    {
                        errors.price ?
                            <p style={{ color: "red" }}>{errors.price.message}</p> :
                            null
                    }
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" name="address" onChange={changeHandler} value={listing.address} />
                    {
                        errors.address ?
                            <p style={{ color: "red" }}>{errors.address.message}</p> :
                            null
                    }
                </div>
                <div>
                    <label>City</label>
                    <input type="txet" name="city" onChange={changeHandler} value={listing.city} />
                    {
                        errors.city ?
                            <p style={{ color: "red" }}>{errors.city.message}</p> :
                            null
                    }
                </div>
                <div>
                    <label>State</label>
                    <input type="txet" name="state" onChange={changeHandler} value={listing.state} />
                    {
                        errors.state ?
                            <p style={{ color: "red" }}>{errors.state.message}</p> :
                            null
                    }
                </div>
                <div>
                    <label>zipcode</label>
                    <input type="number" name="zipcode" onChange={changeHandler} value={listing.zipcode} />
                    {
                        errors.zipcode ?
                            <p style={{ color: "red" }}>{errors.zipcode.message}</p> :
                            null
                    }
                </div>
                <div>
                    <label>SqFt</label>
                    <input type="number" name="sqft" onChange={changeHandler} value={listing.sqft} />
                    {
                        errors.sqft ?
                            <p style={{ color: "red" }}>{errors.sqft.message}</p> :
                            null
                    }
                </div>
                <div>
                    <label>Bed</label>
                    <input type="number" name="bed" onChange={changeHandler} value={listing.bed} />
                </div>
                <div>
                    <label>Bath</label>
                    <input type="number" name="bath" onChange={changeHandler} value={listing.bath} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea type="text" name="desc" onChange={changeHandler} value={listing.desc} rows="4" cols="30"/>
                    {
                        errors.desc?
                            <p style={{ color: "red" }}>{errors.desc.message}</p> :
                            null
                    }
                </div>


                <input type="submit" value="Create Listing" />

            </form>
        </div>
    );
}

export default ListingForm;
