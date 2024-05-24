import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../component/topNav';
import Modal from 'react-bootstrap/Modal';
import '../style/style.css';

function Team() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow
    (true);
    const handleShow2 = () => setShow2(true);
    const [val, setvalue] = useState({
        name: '',
        gender: '',
        age: '',
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
            const response = await axios.get(`/player`);
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const Submit = async (e) => {
        e.preventDefault();
        console.log(val);
        try {
            const create = await axios.post('/create', val);
            if (create.data === 'Exist') {
                alert('Already Exist');
            } else if (create.data === 'done') {
                // navigate(`/playerlist/${val.id}`);~
                window.location.reload();

            }
            else if (create.data === 'limit') {
                alert('Reach Limit');
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const deletename = async (e) => {
        console.log(val);
        try {
            const create = await axios.delete(`/delete/${e}`);
            if (create.data === "deleted") {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const updated = (d) => {
        const up = axios.put(`/update/${d}`, val);
        console.log(up.data);
        window.location.reload();
    }

    return (
        <>
            <Nav />
            <div>
                <button
                    onClick={handleShow}
                    className="m-3 bt"
                    style={{ width: '130px', fontSize: '18px', backgroundColor: '#ae0c00' }}
                >
                    Add
                </button>
                <div className="play_back">
                    <div className="w-75">
                        {data.map((value) => (
                            <div>

                                <div className="inside_play mt-3">
                                    <div className="m-2">

                                    </div>
                                    <div className='m-2'> Property Name : {value.name}</div>
                                    <div className='m-2'> Property Location: {value.location}</div>
                                    <div className='m-2'> Property Price: {value.price}</div>
                                    <div className='d-flex'>
                                        <div><button className='bt2 ms-2' onClick={() => {handleShow2(value.name)}}>Edit</button></div>
                                        <div><button className='bt2 ms-2' onClick={() => { deletename(value.name) }}>Delete</button></div>
                                    </div>

                                    <Modal show={show2} onHide={handleClose2} centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit</Modal.Title>
                                        </Modal.Header>
                                        <div>
                                            <div className="modal_in m-3">
                                            </div>
                                            <div className="modal_in m-3">
                                                <label>Property Name</label>
                                                <input
                                                    className="mt-1 p-1 inp"
                                                    name="name"
                                                    min={1}
                                                    max={100}
                                                    style={{ width: '90%' }}
                                                    onChange={input}

                                                />
                                            </div>
                                            <div className="modal_in m-3">
                                                <label>Property Location</label>
                                                <input
                                                    className="mt-1 p-1 inp"
                                                    name="location"
                                                    min={1}
                                                    max={100}
                                                    style={{ width: '90%' }}
                                                    onChange={input}

                                                />
                                            </div>
                                            <div className="modal_in m-3">
                                                <label>Property Price</label>
                                                <input
                                                    className="mt-1 p-1 inp"
                                                    name="price"
                                                    min={1}
                                                    max={100}
                                                    style={{ width: '90%' }}
                                                    onChange={input}

                                                />
                                            </div>
                                            <button
                                                className="ms-3 mb-3 bt"
                                                style={{ width: '100px', fontSize: '17px' }}
                                                onClick={() => { updated(value.name) }}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </Modal>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Property</Modal.Title>
                </Modal.Header>
                <div>
                    <div className="modal_in m-3">


                        <label>Property Name</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="name"
                            min={1}
                            max={100}
                            style={{ width: '90%' }}
                            onChange={input}
                        />
                    </div>
                    <div className="modal_in m-3">
                        <label>Property Location</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="location"
                            min={1}
                            max={100}
                            style={{ width: '90%' }}
                            onChange={input}
                        />
                    </div>
                <div className="modal_in m-3">
                        <label>Property Price</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="price"
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
                        Add
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default Team;
