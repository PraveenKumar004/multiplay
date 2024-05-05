import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../component/topNav';
import Modal from 'react-bootstrap/Modal';
import '../style/style.css';

function Team() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [val, setvalue] = useState({
        pid: '',
        name: '',
        password: '',
        mid: '',
        score:0
    });
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

    useEffect(() => {
        setvalue({ ...val, mid: id });
    }, [data]);

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const Submit = async (e) => {
        e.preventDefault();
        console.log(val);
        try {
            const create = await axios.post('/playercreate', val);
            if (create.data === 'Exist') {
                alert('Already Exist');
            } else if (create.data === 'done') {
                // navigate(`/playerlist/${val.id}`);
                window.location.reload();

            }
            else if(create.data === 'limit'){
                alert('Reach Limit');
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const Login = async (e) => {
        e.preventDefault();
        console.log(val);
        try {
            const create = await axios.post('/playerpassword', val);
            if (create.data === 'correct') {
                navigate(`/contestant/${val.pid}`)             
            }
            else{
                alert('Enter valid password');
            } 
                
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    return (
        <>
            <Nav />
            <div>
                <button
                    onClick={handleShow}
                    className="m-2 bt"
                    style={{ width: '130px', fontSize: '18px' }}
                >
                    New Player
                </button>
                <div className="play_back">
                    <div className="player">
                        {data.map((value) => (
                            <div className="inside_play mt-3" key={value.pid}>
                                <label className="m-2">
                                    {value.name} ( ID: {value.pid} )
                                </label>
                                <div><input
                                        className="ms-2 p-1 inp"
                                        placeholder="Enter ID"
                                        style={{ width: '300px' }}
                                        name='pid'
                                        onChange={input}
                                    /></div>
                                <div>
                                    <input
                                        className="ms-2 mt-2 p-1 inp"
                                        placeholder="Enter Password"
                                        style={{ width: '300px' }}
                                        name="password"
                                        onChange={input}
                                    />
                                    <button className="ms-1 bt2 p-1" onClick={Login}>Join</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Player</Modal.Title>
                </Modal.Header>
                <div>
                    <div className="modal_in m-3">
                        <label>Player Name</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="name"
                            style={{ width: '90%' }}
                            onChange={input}
                        />
                    </div>
                    <div className="modal_in m-3">
                        <label>Player ID</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="pid"
                            style={{ width: '90%' }}
                            onChange={input}
                        />
                    </div>
                    <div className="modal_in m-3">
                        <label>Enter Password</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="password"
                            type="number"
                            min={1}
                            max={100}
                            style={{ width: '90%' }}
                            onChange={input}
                        />
                    </div>
                    <button
                        className="ms-3 mb-3 bt"
                        style={{ width: '100px', fontSize: '17px' }}
                        onClick={Submit}
                    >
                        Create
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default Team;
