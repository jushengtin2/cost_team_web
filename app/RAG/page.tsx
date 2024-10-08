"use client";
import React, { useRef, useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './RAG.css';
import Link from "next/link";
import AttachFileIcon from '@mui/icons-material/AttachFile';


// 不同user不同css
const Message = ({ sender, text }) => {
    const isUser = sender === 'User';
    return (
      <div className={`${isUser ? 'user_message' : 'ai_message'}`}> 
        <div className={`${isUser ? 'user_content' : 'ai_content'}`}>
          <strong>{sender}:</strong> {text}
        </div>
      </div>
    );
};

export default function Cost_team_GPT() {
    const gptFileInputRef = useRef<HTMLInputElement>(null);
    const [gptFileInput, setgptFileInput] = useState<string>("");
    const [messages, setMessages] = useState([]);
    const [message_input, setInput] = useState('');
    const replyMessageZoneRef = useRef(null);

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
        } 
      };
    

    useEffect(() => {
        if (replyMessageZoneRef.current) {
            replyMessageZoneRef.current.scrollTop = replyMessageZoneRef.current.scrollHeight;
        }
    }, [messages]); // 每次 messages 改變時觸發滾動

   
    // 处理消息发送
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!message_input.trim()) return;
    
        // 添加用户消息
        const userMessage = { sender: 'User', text: message_input };
        setMessages((prev) => [...prev, userMessage]);
    
       
        setInput('');
    
        try {
            
            const response = await fetch('http://15.38.111.74:8081/ollama', {  // 改成後端的 IP 和端口
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input })  // 传递用户输入的 prompt
            });
    
            const data = await response.json();
    
            // 添加 AI 的回复
            const aiMessage = { sender: 'AI', text: data.response };
            setMessages((prev) => [...prev, aiMessage]);
    
        } catch (error) {
            console.error('Error fetching AI response:', error);
        }
    
      
    };
    

    return (
        <div className='Cost_team_GPT_page'>
            <title>Cost team GPT</title>
            <div className='Cost_team_GPT_title_zone'>
                <Link href="/" className="Cost_team_GPT_go_back_btn">
                    <ArrowBackIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                    Menu
                </Link>
                <h1>Cost team GPT</h1>
            </div>
            <div className='chat_zonee'>
                <div className='chatbox_zonee'>
                    <div className='reply_message_zonee' ref={replyMessageZoneRef}>
                        {messages.map((msg, index) => (
                            <Message key={index} sender={msg.sender} text={msg.text} />
                        ))}
                    </div>
                </div>
               
                <div className='message_input_zone'>
                    <form onSubmit={handleSubmit} className='abc'>
                        <button type="button" className='upload_file_to_gpt' onClick={() => handleButtonClick(gptFileInputRef)}>
                            <AttachFileIcon/> 
                        </button>
                        
                        <input className='message_input'
                            type="text"
                            value={message_input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."   
                        />
                        <button type="submit"  className='send_message_btn' >
                            Send
                        </button>
                    </form>
                </div>             
            </div>

            <input
            type="file" 
            ref={gptFileInputRef}
            className="hidden-file-input"
            onChange={(event) => handleFileChange(event, setgptFileInput)}
            title="Choose a file to upload"
            />
        </div>
    );
}
