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
                    <div>
                        <h2>Winner is </h2>
                    </div>
                    {data.map((value) => (
                        <div className='inside_play mt-3'>
                            <label className='m-2'>Player : {value.name} ( ID: {value.pid} )</label>
                            <div className='d-flex'><p className='ms-2 p-2 inp' placeholder='Enter Password' style={{ width: '300px' }} >Score: {value.score}</p><button className='ms-1 bt2' style={{ width: '170px', height: '45px' }}>Announce as Winner</button></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Dash