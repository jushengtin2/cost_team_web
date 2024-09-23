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
      <div className={`message ${isUser ? 'user_message' : 'ai_message'}`}> 
        <div className={`message_content ${isUser ? 'user_content' : 'ai_content'}`}>
          <strong>{sender}:</strong> {text}
        </div>
      </div>
    );
};

export default function Cost_team_GPT() {
    const programMatrixFileInputRef = useRef<HTMLInputElement>(null);
    const [programMatrixFileName, setProgramMatrixFileName] = useState<string>("");
    const [messages, setMessages] = useState([]);
    const [temp_input, setTemp_input] = useState('');
    const [input, setInput] = useState('');
    const replyMessageZoneRef = useRef(null);

    useEffect(() => {
        if (replyMessageZoneRef.current) {
            replyMessageZoneRef.current.scrollTop = replyMessageZoneRef.current.scrollHeight;
        }
    }, [messages]); // 每次 messages 改變時觸發滾動

    const handleButtonClick = (inputRef) => {
        if (inputRef.current) {
          inputRef.current.click();
        }
      };
    // 处理消息发送
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!input.trim()) return;

        // 添加用户消息
        const userMessage = { sender: 'User', text: input };
        setMessages((prev) => [...prev, userMessage]);

        setTemp_input(input);
        setInput('');
        try {
            setInput('');
            const response = await fetch('http://127.0.0.1:11434/api/generate', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: "gemma2:2b", prompt: input ,"stream": false}),
              });
          
          const data = await response.json();

          // 添加 AI 的回复
          const aiMessage = { sender: 'AI', text: data.response };
          setMessages((prev) => [...prev, aiMessage]);

        } catch (error) {
          console.error('Error fetching AI response:', error);
        }

        setTemp_input('');
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
            <div className='chat_zone'>
                <div className='chatbox_zone'>
                    <div className='reply_message_zone' ref={replyMessageZoneRef}>
                        {messages.map((msg, index) => (
                            <Message key={index} sender={msg.sender} text={msg.text} />
                        ))}
                    </div>
                </div>
               
                <div className='message_input_zone'>
                    <form onSubmit={handleSubmit} className='abc'>
                        <button className='upload_file_to_gpt' onClick={() => handleButtonClick(programMatrixFileInputRef)}>
                            <AttachFileIcon/> 
                        </button>
                        <input className='message_input'
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."   
                        />
                        <button type="submit"  className='send_message_btn' onClick={() => handleSubmit(input)}>
                            Send
                        </button>
                    </form>
                </div>             
                
            </div>
        </div>
    );
}
