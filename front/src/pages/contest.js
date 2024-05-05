import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../component/topNav';
import Modal from 'react-bootstrap/Modal';
import '../style/style.css';

function Contest() {
  return (
    <>
     <Nav />
     <div>
     <div className='play_back'>
                <div className='player mt-5'>
                    <div className='m-5'>
                        <h2>Hello Player </h2>
                    </div>
                </div>
            </div>
     </div>
    </>
  )
}

export default Contest