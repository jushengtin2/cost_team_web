"use client";
import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './DT_cost_sanity_check_page.css';
import { useRef, useState,useEffect } from 'react';
import Link from "next/link";
import useDarkMode from '../../hooks/useDarkMode'; // 引入dark-mode的 Hook
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function DT_CostSanityCheckPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // 使用 Dark Mode Hook

  const programMatrixFileInputRef = useRef<HTMLInputElement>(null);
  const mspekeFileInputRef = useRef<HTMLInputElement>(null);
  const hardwareQualMatrixFileInputRef = useRef<HTMLInputElement>(null);
  const CPCFileInputRef = useRef<HTMLInputElement>(null);

  const [programMatrixFileName, setProgramMatrixFileName] = useState<string>("");
  const [mspekeFileName, setMspekeFileName] = useState<string>("");
  const [hardwareQualMatrixFileName, setHardwareQualMatrixFileName] = useState<string>("");
  const [CPCFileName, setCPCFileName] = useState<string>("");

  const [downloadFileName, setDownloadFileName] = useState<string>('');
  const [downloadFileName2, setDownloadFileName2] = useState<string>('');

  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileUrl2, setFileUrl2] = useState<string>('');

  const [deleteMessage, setDeleteMessage] = useState<string>(''); 
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [uploadBOMComplete, setUploadBOMComplete] = useState(false);
  const [uploadBOM_MSPEKE_HQM_Complete, setUploadBOM_MSPEKE_HQM_Complete] = useState(false);
  const [upload_CPC_Complete, setUpload_CPC_Complete] = useState(false);

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
        const response = await fetch('http://15.38.111.74:8080/NB_delete', {
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
            setCPCFileName("");
            setUploadBOMComplete(false);
            setUploadBOM_MSPEKE_HQM_Complete(false);
            setUpload_CPC_Complete(false);

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
            if (CPCFileInputRef.current) {
              CPCFileInputRef.current.value = "";
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

    const formData = new FormData();
    formData.append('programMatrixFile', programMatrixFileInputRef.current.files[0]);
    formData.append('mspekeFile', mspekeFileInputRef.current.files[0]);
    formData.append('hardwareQualMatrixFile', hardwareQualMatrixFileInputRef.current.files[0]);
    formData.append('CPCFile', CPCFileInputRef.current.files[0]);
 
    try {
 
      const response = await fetch('http://15.38.111.74:8080/NB_upload', { //測試點
        method: 'POST',
        mode: 'cors',
        body: formData,
      });

      if (response.ok && programMatrixFileInputRef.current.files[0] && mspekeFileInputRef.current.files[0] &&  hardwareQualMatrixFileInputRef.current.files[0] && CPCFileInputRef.current.files[0])  {
        console.log('Upload successfully');
        setUploadMessage('Upload successfully');
        setUploadBOMComplete(true)
        setUploadBOM_MSPEKE_HQM_Complete(true)
        setUpload_CPC_Complete(true)
        
      } 
      else if ( response.ok && programMatrixFileInputRef.current.files[0] && mspekeFileInputRef.current.files[0] &&  hardwareQualMatrixFileInputRef.current.files[0] )  {
        console.log('Upload successfully');
        setUploadMessage('Upload successfully');
        setUploadBOM_MSPEKE_HQM_Complete(true)
        setUploadBOMComplete(true)
      }
      else if (response.ok && CPCFileInputRef.current.files[0] && programMatrixFileInputRef.current.files[0])  {
        console.log('Upload successfully');
        setUploadMessage('Upload successfully');
        setUpload_CPC_Complete(true);
        setUploadBOMComplete(true)
      
        
      }   
      else if (response.ok && programMatrixFileInputRef.current.files[0])  {
        console.log('Upload successfully');
        setUploadMessage('Upload successfully');
        setUploadBOMComplete(true)
       
      } 
      
      else {
        console.error('Fail to upload');
        setUploadMessage('Fail to upload (maybe lack some file or got some error in your file)')
      }
    } catch (error) {
      console.error('error to upload', error);
    }
  };

  const handle_BOM_Cost_Check = async () => {
    setLoading(true); // 顯示旋轉動畫
    setDownloadFileName('');
    setDownloadFileName2('');
    try {
      const response = await fetch('http://15.38.111.74:8080/NB_bom_cost_check', {
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
      const response = await fetch('http://15.38.111.74:8080/NB_bom_cost_check_for_highlight_file', {
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
    }finally {
      setLoading(false); // 隱藏旋轉動畫
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

  const handle_HQM_based_component_Check = async () => {
    setDownloadFileName('');
    setDownloadFileName2('');
    setLoading(true); // 顯示旋轉動畫
    try {
      const response = await fetch('http://15.38.111.74:8080/NB_hqm_based_component_check', {
        method: 'GET',
        mode: 'cors',
      });

      if (response.ok) {
        const blob = await response.blob(); // blob = binary big object
        const url = window.URL.createObjectURL(blob);  // 生成一個url來下載這個blob
        setFileUrl(url); // 保存生成的 URL
        setDownloadFileName('HQM_Based_component_error_list.xlsx'); // 保存文件名
        console.log('hqm_based_component_check文件已准备好下载');
      } else {
        console.error('无法获取hqm_based_component_check文件');
      }
    } catch (error) {
      console.error('获取hqm_based_component_check时发生错误:', error);
    } finally {
      setLoading(false); // 隱藏旋轉動畫
    }
  };

  const handle_BOM_based_component_Check = async() => {
    setDownloadFileName('');
    setDownloadFileName2('');
    setLoading(true); // 顯示旋轉動畫
    try {
      const response = await fetch('http://15.38.111.74:8080/NB_bom_based_component_check', {
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
        console.error('無法獲取bom_based_component_check');
      }
    } catch (error) {
      console.error('獲取bom_based_component_check時發生錯誤', error);
    }
    finally {
      setLoading(false); // 隱藏旋轉動畫
    } 
  };
  const handle_CPC_based_component_Check = async() => {
    setDownloadFileName('');
    setDownloadFileName2('');
    setLoading(true); // 顯示旋轉動畫
    try {
      const response = await fetch('http://15.38.111.74:8080/CPC_check', {
        method: 'GET',
        mode: 'cors',
      });

      if (response.ok) {
        const blob = await response.blob(); //blob = binary big object
        const url = window.URL.createObjectURL(blob);  //生成一個url來下載這個blob
        setFileUrl(url); // 保存生成的 URL
        setDownloadFileName('CPC_check.xlsx'); // 保存文件名
        console.log('CPC_check文件已準備好下載');
      } else {
        console.error('無法獲取CPC_check');
      }
    } catch (error) {
      console.error('獲取CPC_check時發生錯誤:', error);
    }
    finally {
      setLoading(false); // 隱藏旋轉動畫
    }
  };

  //這邊是因為黑暗模式之下有一些幫按鈕掛上dark-mode的衝突所以另外寫一個監聽
  useEffect(() => {
    const DT_cost_check_button = document.querySelector('.DT_cost_check_btn');
    const DT_CPC_based_component_check_button = document.querySelector('.DT_CPC_based_component_check_btn');
    const DT_HQM_based_component_check_button = document.querySelector('.DT_HQM_based_component_check_btn');
    const DT_BOM_based_component_check_button = document.querySelector('.DT_BOM_based_component_check_btn');
    const downloadFileName = document.querySelector('.downloadFileName');
    const downloadFileName2 = document.querySelector('.downloadFileName2');

    if (uploadBOMComplete && isDarkMode) {
      // 如果 uploadBOMComplete 為 true，添加 .dark-mode 類
      DT_cost_check_button?.classList.add('dark-mode');
    } 
    if (uploadBOMComplete && upload_CPC_Complete && isDarkMode) {
      DT_CPC_based_component_check_button?.classList.add('dark-mode');
    }
    if (uploadBOM_MSPEKE_HQM_Complete && isDarkMode) {
      DT_HQM_based_component_check_button?.classList.add('dark-mode');
      DT_BOM_based_component_check_button?.classList.add('dark-mode');
    }
    if(downloadFileName && isDarkMode){
      downloadFileName?.classList.add('dark-mode');
    }
    if(downloadFileName2 && isDarkMode){
      downloadFileName2?.classList.add('dark-mode');
    }
    

  }, [uploadBOMComplete, upload_CPC_Complete, uploadBOM_MSPEKE_HQM_Complete]); 

  return (
    <div className='DT_cost_sanity_check_page'>
      <title>NB Cost Sanity Check</title>
      
      <div className='DT_cost_sanity_check_title_zone'>
        <Link href="/" onClick={handleDelete} className="DT_go_back_btn">
          <ArrowBackIcon  style={{marginRight : '8px'}}/>
          Menu
        </Link>
          <h1>DT Cost Sanity Check</h1>
      </div>
      
      <button className='DT_dark_mode_btn' onClick={toggleDarkMode} >
          {isDarkMode ? (
          <WbSunnyOutlinedIcon style={{ fontSize: '50px' }} /> // 亮模式圖標
        ) : (
          <DarkModeIcon style={{ fontSize: '50px' }} /> // 暗模式圖標
        )}
      </button>

      <div className='DT_function_zone'>
        <div className='DT_upload_file_zone'>
          <div className='DT_upload_file_zone_title'>
            Choose the file here:
          </div>
          <div className='DT_bom_btn_zone'> {/* 檢查 programMatrixFileName 是否為空或正在加載*/}
            <Button className='DT_bom_btn' onClick={() => handleButtonClick(programMatrixFileInputRef)}>
              BOM
            </Button>
          </div>
          <div className='DT_mspeke_btn_zone'>
            <Button className='DT_mspeke_btn' onClick={() => handleButtonClick(mspekeFileInputRef)}>
              MSPEK
            </Button>
          </div>
          <div className='DT_hard_qual_matrix_btn_zone'>
            <Button className='DT_hard_qual_matrix_btn' onClick={() => handleButtonClick(hardwareQualMatrixFileInputRef)}>
              HQM
            </Button>
          </div>
          <div className='DT_CPC_btn_zone'>
            <Button className='DT_CPC_btn' onClick={() => handleButtonClick(CPCFileInputRef)}>
              CPC
            </Button>
          </div>
          <div className='DT_upload_and_delete_zone'>
            <div className='DT_upload_zone'>
              <Button className='DT_upload_btn' onClick={handleUpload}>
                Upload
              </Button>
            </div>
            <div className='DT_delete_zone'>
              <Button className='DT_delete_btn' onClick={handleDelete}>
                Delete
              </Button>
            </div>

          </div>
          
          
        </div>

        <div className='DT_choose_function_zone'>
          <div className='DT_choose_function_title' >
            Choose the function:
          </div>
          <div className='DT_cost_check_zone'>
            <Button className='DT_cost_check_btn' onClick={handle_BOM_Cost_Check} disabled={!uploadBOMComplete} >
              BOM Cost Check
            </Button>
          </div>
          <div className='DT_HQM_based_component_check_zone'>
            <Button className='DT_HQM_based_component_check_btn' onClick={handle_HQM_based_component_Check} disabled={!uploadBOM_MSPEKE_HQM_Complete} >
              HQM-Based Component check
            </Button>
          </div>
          <div className='DT_BOM_based_component_check_zone'>
            <Button className='DT_BOM_based_component_check_btn' onClick={handle_BOM_based_component_Check} disabled={!uploadBOM_MSPEKE_HQM_Complete} >
              BOM-Based Component check
            </Button>
          </div>
          <div className='DT_CPC_based_component_check_zone'>
            <Button className='DT_CPC_based_component_check_btn' onClick={handle_CPC_based_component_Check} disabled={!upload_CPC_Complete} >
              CPC check
            </Button>
          </div>
        </div>

        <div className='DT_message_plus_result_zone'>
          <div className='DT_message_zone'>
            <div className='DT_message_zone_title'>
              Message Box
            </div>
            <div className='DT_message'>
              {programMatrixFileName && <div>Program Matrix: {programMatrixFileName}</div>}
              {mspekeFileName && <div>MSPEK: {mspekeFileName}</div>}
              {hardwareQualMatrixFileName && <div>Hardware Qual Matrix: {hardwareQualMatrixFileName}</div>}
              {CPCFileName && <div>CPC: {CPCFileName}</div>}
              {deleteMessage && <div>{deleteMessage}</div>} {/* 显示删除后的消息 */}
              {uploadMessage && <div>{uploadMessage}</div>}
            </div>
          </div>

          <div className='DT_result_zone'>
            <div className='DT_result_title'>
              Result
            </div>
            <div className="DT_spinner">
              {loading && <CircularProgress size={50} />}
            </div>

            {downloadFileName && (
              <div className='DT_download_zone'>
                <p><Button onClick={handleDownload} className='DT_handleDownload'>
                  {downloadFileName}
                </Button></p>
                <p><Button onClick={handleDownload2} className='DT_handleDownload'>
                  {downloadFileName2} 
                </Button></p>
              </div>
            )}
          </div>
        </div>

        {/* 隱藏的文件輸入框 */}  {/* type="file"代表是一個文件選擇框 */}
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
        <input
          type="file"
          ref={CPCFileInputRef}
          className="hidden-file-input"
          onChange={(event) => handleFileChange(event, setCPCFileName)}
          title="Choose a file to upload"
        />
      </div>
    </div>
  );
}
 