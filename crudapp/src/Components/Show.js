import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Show() {
    const navigate = useNavigate();
    const [order, setorder] = useState([]);

    const getorder = () => {
        axios.get('http://localhost:9595/Orders/all')
            .then(response => {
                console.log(response.data);
                setorder(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleRegister = () => {
        navigate("register");
    };

    const handleLocalStorage = (id, deliveryAddress, deliveryDate, orderid, deliveryFee) => {
        localStorage.setItem("id", id);
        localStorage.setItem("deliveryAddress", deliveryAddress);
        localStorage.setItem("deliveryDate", deliveryDate);
        localStorage.setItem("orderid", orderid);
        localStorage.setItem("deliveryFee", deliveryFee);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9595/orders/delete/${id}`)
            .then(response => {
                console.log(response.data);
                getorder();
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getorder();
    }, []);

    return (
        <div className="container mt-3 mb-3">
            <button className="btn btn-info m-2" onClick={handleRegister}>Register</button>
            <h3>delivery list</h3>
            <div className="row mt-3 mb-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">deliveryAddress</th>
                            <th scope="col">deliveryDate</th>
                            <th scope="col">orderid</th>
                            <th scope="col">deliveryFee</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map(order => (
                            <tr key={order._id}>
                               
                                <td>{order.deliveryAddress}</td>
                                <td>{order.deliveryDate}</td>
                                <td>{order.orderid}</td>
                                <td>{order.deliveryFee}</td>
                                <td>
                                    <Link to="/update">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleLocalStorage(order._id, order.deliveryAddress, order.deliveryDate, order.orderid, order.deliveryFee)}
                                        >
                                            Update
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(order._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
