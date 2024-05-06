import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../component/topNav';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Dash() {

    const [data, setData] = useState([]);
    const [win, setWin] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
        GetWinner();
    }, []);

    const GetData = async () => {
        try {
            const response = await axios.get(`/player/${id}`);
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const GetWinner = async () => {
        try {
            const response = await axios.get(`/winnershow/${id}`);
            setWin(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const announceWinner = (player) => {
        axios.post(`/winner/${player.pid}`, player);
        window.location.reload();
    }

    // Sort players by score
    const sortedData = [...data].sort((a, b) => b.score - a.score);

    return (
        <>
            <div className='play_back'>
                <div className='player'>
                    {win.length > 0 ? (
                        <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
                            <h2 className='mt-5'>Winner is </h2>
                            {win.map((value) => (
                                <div className='mt-2' key={value.pid}>
                                    <h1 className='m-2 text-center'>  {value.name} ({value.pid})</h1>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
                            {sortedData.map((value) => (
                                <div className='inside_play mt-3' key={value.pid}>
                                    <label className='m-2'>Player : {value.name} ( ID: {value.pid} )</label>
                                    <div className='d-flex'><p className='ms-2 p-2 inp' placeholder='Enter Password' style={{ width: '300px' }} >Score: {value.score}</p><button className='ms-1 bt2' style={{ width: '170px', height: '45px' }} onClick={() => { announceWinner(value) }}>Announce as Winner</button></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dash;
