"use client";
import React from 'react';
import './CRT.css';
import AttachFileIcon from '@mui/icons-material/AttachFile';
export default function CRT() {

  return (
    <div className='CRT_page'>
      <title>cost recovery team</title>
      
      <div className='CRT_page_title'>
        <h1>Call Case Note Tool</h1>
      </div>

      <div className='CRT_main_page'>
        <div className='CRT_input_zone'>

          <div className='CRT_input_title'>
            <h1>input</h1>
          </div>
          
          <div className='i1_zone'>
            <h2 className='i1_zone_title'>Investgating Platform: </h2>
            <input className='i1'
                type="text"
                placeholder="Type your message..."   
            />
          </div>

          <div className='i1_zone'>
          <h2 className='i1_zone_title'>Investgating Platform:</h2>
            <input className='i1'
                type="text"
                placeholder="Type your message..."   
            />
          </div>

          <div className='i1_zone'>
          <h2 className='i1_zone_title'>Investgating Platform:</h2>
            <input className='i1'
                type="text"
                placeholder="Type your message..."   
            />
          </div>

          <div className='i1_zone'>
          <h2 className='i1_zone_title'>Investgating Platform:</h2>
            <input className='i1'
                type="text"
                placeholder="Type your message..."   
            />
          </div>

          <div className='i1_zone'>
          <h2 className='i1_zone_title'>Investgating Platform:</h2>
            <input className='i1'
                type="text"
                placeholder="Type your message..."   
            />
          </div>
          <div className='i1_zone'>
            <h2 className='i1_zone_title'>Investgating Platform:</h2>
            <button type="button" className='CRT_upload_btn'>
                <AttachFileIcon/> 
            </button>
          </div>

          <div className='btnn_zone'>

            <button className='CRT_btn'>upload</button>
          </div>
          

        </div>

        <div className='CRT_output_zone'>
          <div className='CRT_output_title'>
            <h1>output</h1>
          </div>

          <div className='o1_zone'>
            <h2 className='o1_zone_title'>RESULT : </h2>

          </div>
          <div className='o1_zone'>
            <h2 className='o1_zone_title'>RESULT : </h2>

          </div>
          <div className='o1_zone'>
            <h2 className='o1_zone_title'>RESULT : </h2>

          </div>
            
        </div>


      </div>
      
      <div>

    
      </div>
    </div>
  );
}
 