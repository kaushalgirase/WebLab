import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [deliveryAddress, setaddress] = useState('');
    const [deliveryDate, setDate] = useState('');
    const [orderid, setorderid] = useState('');
    const [deliveryFee, setdeliveryFee] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9595/Orders/add', {
            deliveryAddress,
            deliveryDate,
            orderid,
            deliveryFee
        })
            .then(response => {
                console.log(response.data);
                navigate("/");
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container">
            <h2>Register Television</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>deliveryAddress</label>
                    <input
                        type="text"
                        className="form-control"
                        value={deliveryAddress}
                        onChange={(e) => setaddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>deliveryDate</label>
                    <input
                        type="text"
                        className="form-control"
                        value={deliveryDate}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>orderid</label>
                    <input
                        type="number"
                        className="form-control"
                        value={orderid}
                        onChange={(e) => setorderid(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>deliveryFee</label>
                    <input
                        type="number"
                        className="form-control"
                        value={deliveryFee}
                        onChange={(e) => setdeliveryFee(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2" >Submit</button>
            </form>
        </div>
    );
}