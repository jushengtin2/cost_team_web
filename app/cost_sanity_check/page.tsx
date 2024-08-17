"use client";

import Button from '@mui/material/Button';
import './cost_sanity_check_page.css';
import { useRef, useState } from 'react';

export default function CostSanityCheckPage() {
  const programMatrixFileInputRef = useRef<HTMLInputElement>(null);
  const mspekeFileInputRef = useRef<HTMLInputElement>(null);
  const hardwareQualMatrixFileInputRef = useRef<HTMLInputElement>(null);
  const [programMatrixFileName, setProgramMatrixFileName] = useState<string>("");
  const [mspekeFileName, setMspekeFileName] = useState<string>("");
  const [hardwareQualMatrixFileName, setHardwareQualMatrixFileName] = useState<string>("");

  const handleButtonClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event, setFileName) => {
    const file = event.target.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') )) {
      setFileName(file.name);
      console.log("選擇的文件:", file.name);
    } else {
      alert("請選擇一個 Excel 文件 (.xlsx 或 .xls)");
    }
  };

  const handleDelete = () => {
    setProgramMatrixFileName("");
    setMspekeFileName("");
    setHardwareQualMatrixFileName("");
    console.log("已刪除選擇的文件");
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('programMatrixFile', programMatrixFileInputRef.current.files[0]);
    formData.append('mspekeFile', mspekeFileInputRef.current.files[0]);
    formData.append('hardwareQualMatrixFile', hardwareQualMatrixFileInputRef.current.files[0]);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('檔案已成功上傳到後端');
        handleDelete(); // 清空所有文件名
      } else {
        console.error('檔案上傳失敗');
      }
    } catch (error) {
      console.error('上傳過程中發生錯誤:', error);
    }
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
            <Button className='bom_btn' onClick={() => handleButtonClick(programMatrixFileInputRef)}>
              Program Matrix
            </Button>
          </div>
          <div className='mspeke_btn_zone'>
            <Button className='mspeke_btn' onClick={() => handleButtonClick(mspekeFileInputRef)}>
              MSPEKE
            </Button>
          </div>
          <div className='hard_qual_matrix_btn_zone'>
            <Button className='hard_qual_matrix_btn' onClick={() => handleButtonClick(hardwareQualMatrixFileInputRef)}>
              Hardware Qual Matrix
            </Button>
          </div>
          <div className='delete_zone'>
            <Button className='delete_btn' onClick={handleDelete}>
              Delete
            </Button>
          </div>
          <div className='upload_zone'>
            <Button className='upload_btn' onClick={handleUpload}>
              Upload
            </Button>
          </div>
          <div className='file_name_display'>
            {programMatrixFileName && <div>Program Matrix: {programMatrixFileName}</div>}
            {mspekeFileName && <div>MSPEKE: {mspekeFileName}</div>}
            {hardwareQualMatrixFileName && <div>Hardware Qual Matrix: {hardwareQualMatrixFileName}</div>}
          </div>
        </div>

        <div className='function_choose_plus_result_zone'>
          123
        </div>

        {/* 隱藏的文件輸入框 */}
        <input
          type="file"
          ref={programMatrixFileInputRef}
          className="hidden-file-input"
          onChange={(event) => handleFileChange(event, setProgramMatrixFileName)}
          title="Choose a file to upload"
        />
        <input
          type="file"
          ref={mspekeFileInputRef}
          className="hidden-file-input"
          onChange={(event) => handleFileChange(event, setMspekeFileName)}
          title="Choose a file to upload"
        />
        <input
          type="file"
          ref={hardwareQualMatrixFileInputRef}
          className="hidden-file-input"
          onChange={(event) => handleFileChange(event, setHardwareQualMatrixFileName)}
          title="Choose a file to upload"
        />
      </div>
    </div>
  );
}
