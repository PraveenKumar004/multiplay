import React from 'react'
import { useState } from 'react';
import '../style/style.css'
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../component/topNav'
import Modal from 'react-bootstrap/Modal';
import Dash from '../component/dashboard'
import Player from '../component/player'
import axios from 'axios';

function Manage() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [num,setnum]=useState(2)
    const navigate = useNavigate();
    const {id}=useParams();
    const page= ()=>{
        if(num === 1){
            return(<Player/>)
        }
        else{
            return(<Dash/>)
        }
    }
    const deletegame = async ()=>{
        try{
            const del = await axios.delete(`/delete/${id}`)
            if(del.data === "deleted"){
                navigate('/');
            }
            else{
                alert("cannot delete")
            }
        }
        catch (err){
            console.log(err)
        }
        

    }

    return (
        <>
            <Nav />
            <div>
                <div >
                    <button onClick={()=>{setnum(2)}} className='m-2 bt' style={{ width: '130px', fontSize: '18px' }}>Dashboard</button>
                    <button onClick={()=>{setnum(1)}} className='m-2 bt' style={{ width: '130px', fontSize: '18px' }}>Players</button>
                    <button onClick={handleShow} className='m-2 bt' style={{ width: '160px', fontSize: '18px' }}>Change Passowrd</button>
                    <button onClick={handleShow} className='m-2 bt' style={{ width: '130px', fontSize: '18px' }}>Delete Game</button>
                    <button onClick={()=>{navigate('/')}} className='m-2 bt' style={{ width: '130px', fontSize: '18px' }}>Logout</button>
                </div>
                <div>{page()}</div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Player</Modal.Title>
                </Modal.Header>
                <div className='d-flex flex-column align-items-center'>
                    <div className='modal_in m-3'>
                        <h4>Are you sure you want to delete?</h4>
                    </div>
                    <button className='ms-3 mb-3 bt' style={{ width: '100px', fontSize: '17px', backgroundColor:"red" }} onClick={deletegame}>Yes</button>
                </div>
            </Modal>
        </>
    )
}

export default Manage;