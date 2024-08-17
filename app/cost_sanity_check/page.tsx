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
  const [downloadFileName, setDownloadFileName] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');

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
        mode: 'cors',
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

  const handle_BOM_Cost_Check = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/bom_cost_check', {
        method: 'GET',
        mode: 'cors',
        
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setFileUrl(url); // 保存生成的 URL
        setDownloadFileName('bom_cost_check.csv'); // 保存文件名
        console.log('CSV 文件已准备好下载');
      } else {
        console.error('无法获取 CSV 文件');
      }
    } catch (error) {
      console.error('获取文件时发生错误:', error);
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = downloadFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(fileUrl);
      console.log('CSV 文件已下载');
    }
  };

  const handle_HQM_based_component_Check = async() => {
    // 在这里添加 HQM-Based Component Check 的逻辑
  };

  const handle_BOM_based_component_Check = async() => {
    // 在这里添加 BOM-Based Component Check 的逻辑
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
              HQM
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
        </div>

        <div className='choose_function_zone'>
          <div className='choose_function_title'>
            Choose the function:
          </div>
          <div className='cost_check_zone'>
            <Button className='cost_check_btn' onClick={handle_BOM_Cost_Check}>
              BOM Cost Check
            </Button>
          </div>
          <div className='HQM_based_component_check_zone'>
            <Button className='HQM_based_component_check_btn' onClick={handle_HQM_based_component_Check}>
              HQM-Based Component check
            </Button>
          </div>
          <div className='BOM_based_component_check_zone'>
            <Button className='BOM_based_component_check_btn' onClick={handle_BOM_based_component_Check}>
              BOM-Based Component check
            </Button>
          </div>
        </div>

        <div className='message_plus_result_zone'>
          <div className='message_zone'>
            <div className='message_zone_title'>
              Message Box
            </div>
            <div className='message'>
              {programMatrixFileName && <div>Program Matrix: {programMatrixFileName}</div>}
              {mspekeFileName && <div>MSPEKE: {mspekeFileName}</div>}
              {hardwareQualMatrixFileName && <div>Hardware Qual Matrix: {hardwareQualMatrixFileName}</div>}
            </div>
          </div>

          <div className='result_zone'>
            <div className='result_title'>
              Result
            </div>
            {downloadFileName && (
              <div className='download_zone'>
                <p>File ready: {downloadFileName}</p>
                <Button onClick={handleDownload}>
                  Download {downloadFileName}
                </Button>
              </div>
            )}
          </div>
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
