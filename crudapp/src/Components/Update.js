import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Update() {
    const [deliveryAddress, setaddress] = useState('');
    const [deliveryDate, setDate] = useState('');
    const [orderid, setorderid] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setaddress(localStorage.getItem('DeliveryAddress'));
        setDate(localStorage.getItem('DeliveryDate'));
        setorderid(localStorage.getItem('Orderid'));
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9595/televisions/update/${localStorage.getItem('id')}`, {
            deliveryAddress,
            deliveryDate,
            orderid
        })
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container">
            <h2>Delete Delivery</h2>
            <form onSubmit={handleUpdate}>
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
                <button type="submit" className="btn btn-primary mt-2" >Submit</button>
            </form>
        </div>
    );
}
