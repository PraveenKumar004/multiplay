import React from 'react';
import { useState } from 'react';
import '../style/style.css';
import Nav from '../component/topNav';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [val, setvalue] = useState({});
    const navigate = useNavigate(); 

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setShow3(false)}

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => {setShow4(true); setShow3(false)}

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const createSubmit = async (e) => {
        e.preventDefault();
        try {
            const create = await axios.post('/create', val);
            if (create.data === "Exist") {
                alert("Already Exist");
            } else if(create.data === "done"){
                navigate(`/manager/${val.id}`);
            }     
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };
    const play = async (e) => {
        e.preventDefault();
        try {
            const create = await axios.post('/contestlog', val);
            if (create.data === "Exist") {
                navigate(`/playerlist/${val.id}`);
            } else if(create.data === "done"){
                alert("Enter a Valid ID");
            }     
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    return (
        <>
            <Nav />
            <div className='home'>
                <div className='modal_in'>
                    <button onClick={handleShow3} className='m-2 bt'>Manager</button>
                    <button onClick={handleShow2} className='m-2 bt'>Contestant</button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Game</Modal.Title>
                </Modal.Header>
                <div>
                    <div className='modal_in m-3'>
                        <label>Enter Game ID</label>
                        <input className='mt-1 p-1 inp' name='id' style={{ width: '90%' }} onChange={input} />
                    </div>
                    <div className='modal_in m-3'>
                        <label>Enter Password</label>
                        <input className='mt-1 p-1 inp' name='password' style={{ width: '90%' }} onChange={input} />
                    </div>
                    <div className='modal_in m-3'>
                        <label>Maximum Player</label>
                        <input className='mt-1 p-1 inp' name='limit' type='number' min={1} max={100} style={{ width: '90%' }} onChange={input} />
                    </div>
                    <button className='ms-3 mb-3 bt' style={{ width: '100px', fontSize: '17px' }} onClick={createSubmit}>Create</button>
                </div>
            </Modal>
            <Modal show={show2} onHide={handleClose2} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Join Game</Modal.Title>
                </Modal.Header>
                <div>
                    <div className='modal_in m-3'>
                        <label>Enter Game ID</label>
                        <input className='mt-1 p-1 inp' name='id' style={{ width: '90%' }} onChange={input} />
                    </div>
                    <button className='ms-3 mb-3 bt' style={{ width: '100px', fontSize: '17px' }} onClick={play}>Join</button>
                </div>
            </Modal>
            <Modal show={show3} onHide={handleClose3} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Manager</Modal.Title>
                </Modal.Header>
                <div className='d-flex flex-column justify-center align-items-center'>
                    <button onClick={handleShow} className='m-2 bt'>New Game</button>
                    <button onClick={handleShow4} className='m-2 bt'>Existing Game</button>
                </div>
            </Modal>
            <Modal show={show4} onHide={handleClose4} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login Game</Modal.Title>
                </Modal.Header>
                <div>
                    <div className='modal_in m-3'>
                        <label>Enter Game ID</label>
                        <input className='mt-1 p-1 inp' name='id' style={{ width: '90%' }} onChange={input} />
                    </div>
                    <div className='modal_in m-3'>
                        <label>Enter Password</label>
                        <input className='mt-1 p-1 inp' name='password' style={{ width: '90%' }} onChange={input} />
                    </div>
                    <button className='ms-3 mb-3 bt' style={{ width: '100px', fontSize: '17px' }} onClick={createSubmit}>Login</button>
                </div>
            </Modal>
        </>
    )
}

export default Home;
