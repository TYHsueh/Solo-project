import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

const EditListing = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    //console.log(id);
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

    //need to find the property first
    useEffect(() =>{
        axios.get(`http://localhost:8000/api/allProperties/${id}`, {withCredentials:true})
            .then((res) =>{
                console.log(res)
                setListing(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }, []);

    const changeHandler = (e)=>{
        setListing({...listing, [e.target.name]:e.target.value})
    };
    const submitHandler= (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/allProperties/${id}`, listing, {withCredentials:true})
            .then((res) =>{
                console.log(res)
                navigate('/myAccount')
            })
            .catch((err)=>{
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }


    
    return (
        <div>
            <div style={{marginTop:"30px"}}><h3>Need to update information?</h3></div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <form onSubmit={submitHandler} style={{ width: "350px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <label className='form-label'>Type</label>
                        <select name="type" onChange={changeHandler} value={listing.type} className='form-select'>
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
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <label className='form-label'>Price/mo</label>
                        <input className='form-control' type="number" name="price" onChange={changeHandler} value={listing.price} />
                        {
                            errors.price ?
                                <p style={{ color: "red" }}>{errors.price.message}</p> :
                                null
                        }
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <label className='form-label'>Address</label>
                        <input className='form-control' type="text" name="address" onChange={changeHandler} value={listing.address} />
                        {
                            errors.address ?
                                <p style={{ color: "red" }}>{errors.address.message}</p> :
                                null
                        }
                    </div>
                    <div className='row'>
                        <div className='col-5' style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <label className='form-label'>City</label>
                            <input className='form-control' type="txet" name="city" onChange={changeHandler} value={listing.city} />
                            {
                                errors.city ?
                                    <p style={{ color: "red" }}>{errors.city.message}</p> :
                                    null
                            }
                        </div>
                        <div className='col-3' style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <label className='form-label'>State</label>
                            <input className='form-control' type="txet" name="state" onChange={changeHandler} value={listing.state} />
                            {
                                errors.state ?
                                    <p style={{ color: "red" }}>{errors.state.message}</p> :
                                    null
                            }
                        </div>
                        <div className='col-4' style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <label className='form-label'>zipcode</label>
                            <input className='form-control' type="number" name="zipcode" onChange={changeHandler} value={listing.zipcode} />
                            {
                                errors.zipcode ?
                                    <p style={{ color: "red" }}>{errors.zipcode.message}</p> :
                                    null
                            }
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <label className='form-label'>SqFt</label>
                        <input className='form-control' type="number" name="sqft" onChange={changeHandler} value={listing.sqft} />
                        {
                            errors.sqft ?
                                <p style={{ color: "red" }}>{errors.sqft.message}</p> :
                                null
                        }
                    </div>
                    <div className='row'>
                        <div className='col-6' style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <label className='form-label'>Bed</label>
                            <input className='form-control' type="number" name="bed" onChange={changeHandler} value={listing.bed} />
                        </div>
                        <div className='col-6' style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <label className='form-label'>Bath</label>
                            <input className='form-control' type="number" name="bath" onChange={changeHandler} value={listing.bath} />
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <label className='form-label'>Description</label>
                        <textarea className='form-control' type="text" name="desc" onChange={changeHandler} value={listing.desc} rows="4" cols="30" />
                        {
                            errors.desc ?
                                <p style={{ color: "red" }}>{errors.desc.message}</p> :
                                null
                        }
                    </div>
                    <div>
                        <input type="submit" value="Edit Listing" className='btn btn-secondary' style={{ marginTop: "20px", backgroundColor: "gold" }} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditListing;
