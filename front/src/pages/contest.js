import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../component/topNav';
import Modal from 'react-bootstrap/Modal';
import '../style/style.css';
import Quiz from '../component//quiz'

function Contest() {
  return (
    <>
     <Nav />
     <div>

      <h3 className='mt-2 ms-3'>Quiz Game</h3>
     <div className='play_back'>
                <div className='player mt-3'>
                        <div style={{width:'500px'}}><Quiz/></div>  
                </div>
            </div>
     </div>
    </>
  )
}

export default Contest