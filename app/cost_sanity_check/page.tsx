"use client";
import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './cost_sanity_check_page.css';
import { useRef, useState } from 'react';
import Link from "next/link";


export default function CostSanityCheckPage() {
  const programMatrixFileInputRef = useRef<HTMLInputElement>(null);
  const mspekeFileInputRef = useRef<HTMLInputElement>(null);
  const hardwareQualMatrixFileInputRef = useRef<HTMLInputElement>(null);
  const [programMatrixFileName, setProgramMatrixFileName] = useState<string>("");
  const [mspekeFileName, setMspekeFileName] = useState<string>("");
  const [hardwareQualMatrixFileName, setHardwareQualMatrixFileName] = useState<string>("");
  const [downloadFileName, setDownloadFileName] = useState<string>('');
  const [downloadFileName2, setDownloadFileName2] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileUrl2, setFileUrl2] = useState<string>('');
  const [deleteMessage, setDeleteMessage] = useState<string>(''); 
  const [uploadMessage, setUploadMessage] = useState<string>('');


  const handleButtonClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event, setFileName) => {
    const file = event.target.files[0];
    setDeleteMessage("");
    setUploadMessage("");
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') )) {
      setFileName(file.name);
      console.log("選擇的文件:", file.name);
    } else {
      alert("請選擇一個 Excel 文件 (.xlsx 或 .xls)");
    }
  };
 
  const handleDelete = async () => {  //要多寫一個跳出頁面的話也要刪掉資料
    try {
        const response = await fetch('http://127.0.0.1:5000/delete', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log("Delete successfully");
            setDeleteMessage("Delete successfully");
            setUploadMessage("");
            setProgramMatrixFileName("");
            setMspekeFileName("");
            setHardwareQualMatrixFileName("");

            // 清空文件输入字段的值
            if (programMatrixFileInputRef.current) {
              programMatrixFileInputRef.current.value = "";
            }
            if (mspekeFileInputRef.current) {
              mspekeFileInputRef.current.value = "";
            }
            if (hardwareQualMatrixFileInputRef.current) {
              hardwareQualMatrixFileInputRef.current.value = "";
            }
        } else {
            console.error("Fail to delete");
            setDeleteMessage("Fail to delete");
        }
    } catch (error) {
        console.error("Error to delete:", error);
        setDeleteMessage("Error to delete");
    }
  };


  const handleUpload = async () => {
    if (!programMatrixFileInputRef.current.files[0] || !mspekeFileInputRef.current.files[0] || !hardwareQualMatrixFileInputRef.current.files[0]) {
      console.error('Lack some files');
      setUploadMessage('Lack some files');
      return;
  }

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
        console.log('Upload successfully');
        setUploadMessage('Upload successfully')
        
      } else {
        console.error('Fail to upload');
        setUploadMessage('Fail to upload')
      }
    } catch (error) {
      console.error('error to upload', error);
    }
  };

  const handle_BOM_Cost_Check = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/bom_cost_check', {
        method: 'GET',
        mode: 'cors',
      });

      if (response.ok) {
        const blob = await response.blob(); //blob = binary big object
        const url = window.URL.createObjectURL(blob);  //生成一個url來下載這個blob
        setFileUrl(url); // 保存生成的 URL
        setDownloadFileName('BOM_cost_error.xlsx'); // 保存文件名
        console.log('CSV 文件已准备好下载');
      } else {
        console.error('无法获取 CSV 文件');
      }
    } catch (error) {
      console.error('获取文件时发生错误:', error);
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/bom_cost_check_for_highlight_file', {
        method: 'GET',
        mode: 'cors',
      });

      if (response.ok) {
        const blob = await response.blob(); //blob = binary big object
        const url = window.URL.createObjectURL(blob);  //生成一個url來下載這個blob
        setFileUrl2(url); // 保存生成的 URL
        setDownloadFileName2('program_matrix_highlight_color.xlsx'); // 保存文件名
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
  const handleDownload2 = () => {
    if (fileUrl) {
      const a = document.createElement('a');
      a.href = fileUrl2;
      a.download = downloadFileName2;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(fileUrl2);
      console.log('CSV 文件已下载');
    }
  };

  const handle_HQM_based_component_Check = async() => {
    try {
      const response = await fetch('http://127.0.0.1:5000/hqm_based_component_check', {
        method: 'GET',
        mode: 'cors',
      });

      if (response.ok) {
        const blob = await response.blob(); //blob = binary big object
        const url = window.URL.createObjectURL(blob);  //生成一個url來下載這個blob
        setFileUrl(url); // 保存生成的 URL
        setDownloadFileName('HQM_Based_component_error_list.xlsx'); // 保存文件名
        console.log('hqm_based_component_check文件已准备好下载');
      } else {
        console.error('无法获取hqm_based_component_check文件');
      }
    } catch (error) {
      console.error('获取hqm_based_component_check时发生错误:', error);
    }
  };

  const handle_BOM_based_component_Check = async() => {
    try {
      const response = await fetch('http://127.0.0.1:5000/bom_based_component_check', {
        method: 'GET',
        mode: 'cors',
      });

      if (response.ok) {
        const blob = await response.blob(); //blob = binary big object
        const url = window.URL.createObjectURL(blob);  //生成一個url來下載這個blob
        setFileUrl(url); // 保存生成的 URL
        setDownloadFileName('BOM_Based_component_error_list.xlsx'); // 保存文件名
        console.log('bom_based_component_check文件已准备好下载');
      } else {
        console.error('无法获取bom_based_component_check');
      }
    } catch (error) {
      console.error('获取bom_based_component_check时发生错误:', error);
    }
  };

  

  return (
    <div className='cost_sanity_check_page'>
      <div className='title_zone'>
       <Link href="/" onClick={handleDelete} className="go_back_btn">
        <ArrowBackIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        Menu
      </Link>
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
              {deleteMessage && <div>{deleteMessage}</div>} {/* 显示删除后的消息 */}
              {uploadMessage && <div>{uploadMessage}</div>}
            </div>
          </div>

          <div className='result_zone'>
            <div className='result_title'>
              Result
            </div>
            {downloadFileName && (
              <div className='download_zone'>
                <p><Button onClick={handleDownload}>
                  {downloadFileName}
                </Button></p>
                <p><Button onClick={handleDownload2}>
                  {downloadFileName2}
                </Button></p>
                
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
