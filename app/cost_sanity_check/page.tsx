"use client";

import Button from '@mui/material/Button';
import './cost_sanity_check_page.css';
import { useRef } from 'react';

export default function CostSanityCheckPage() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // 當按鈕被點擊時，觸發文件選擇框
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // 這裡你可以處理文件的上傳邏輯
    console.log("選擇的文件:", file);
  };

  return (
    <div className='cost_sanity_check_page'>
      <div className='title_zone'>
        <h1>Cost Sanity Check</h1>
      </div>

      <div className='function_zone'>
        <div className='upload_file_zone'>
          <div className='upload_file_zone_title'>
            Upload the file here:
          </div>
          <div className='bom_btn_zone'>
            <Button className='bom_btn' onClick={handleButtonClick}>
              Program Matrix
            </Button>
          </div>
          <div className='mspeke_btn_zone'>
            <Button className='mspeke_btn' onClick={handleButtonClick}>
              MSPEKE
            </Button>
          </div>
          <div className='hard_qual_matrix_btn_zone'>
            <Button className='hard_qual_matrix_btn' onClick={handleButtonClick}>
              Hardware Qual Matrix
            </Button>
          </div>
          <div className='delete_zone'>
            <Button className='delete_btn' onClick={handleButtonClick}>
              Delete
            </Button>
          </div>
          <div className='upload_zone'>
            <Button className='upload_btn' onClick={handleButtonClick}>
              Upload
            </Button>
          </div>
        </div>

        <div className='function_choose_plus_result_zone'>
          123
        </div>

        {/* 隱藏的文件輸入框 */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
