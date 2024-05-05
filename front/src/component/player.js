import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../component/topNav';
import Modal from 'react-bootstrap/Modal';

function Dash() {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
        console.log(data);
    }, []);

    const GetData = async () => {
        try {
            const response = await axios.get(`/player/${id}`);
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className='play_back'>
                <div className='player'>
                    {data.map((value) => (
                        <div className='inside_play mt-3'>
                            <label className='m-2'>Name: {value.name} </label>
                            <label className='ms-2'>ID: {value.pid} </label>
                            <button className='ms-1 bt2' style={{ backgroundColor: 'red' }}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Dash