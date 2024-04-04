import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import './Right.css';
import { Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { collection, addDoc, query, orderBy, limit, onSnapshot,getDocs } from "firebase/firestore";
import db from "../firebase";

function Right({ menu, setMenu, chatid }) {
    const aiAvatar = "https://logowik.com/content/uploads/images/chatgpt5223.logowik.com.webp";
    const [input, setInput] = useState('');
    const [chatLog, setChatLog] = useState([ 
        { user: "ai", message: 'How can I help today?' }
    ]);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {                                                     //scroll to bottom
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatLog]);

    useEffect(()=>{
        const messages = [];
        setChatLog([
            { user: "ai", message: 'How can I help you today?' }
        ]);
    },[chatid])

    async function handleSubmit(e) {
        e.preventDefault();

        const newUserMessage = { user: "me", message: input };      //Adding usermessage
        setChatLog(prevChatLog => [...prevChatLog, newUserMessage]);
            
    
        try {
            const response = await fetch('http://127.0.0.1:5000/get_answer', {          //API call
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'question': input }),
            });
    
            if (response.ok) {
                const data = await response.json();
                const newAiMessage = { user: 'ai', message: data.answer };      //AI reply
                setChatLog(prevChatLog => [...prevChatLog, newAiMessage]);
            } else {
                console.error('Failed to get AI reply');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setInput('');
    }
    
    

    return (
        <>
            {!menu && <div className="right h-screen text-white text-3xl text-center">
                <div className="header text-center text-4xl p-2 sticky top-0 mb-2">
                    <MenuIcon className='menu' style={{ fontSize: 40 }} onClick={() => (setMenu(true))} />
                    Kissan GPT
                </div>
                {/* Display chat log */}
                <div ref={chatContainerRef} className="chat__container">
                    {chatLog.map((entry, index) => (
                        <div key={index} className={`chatlog ${entry.user === 'ai' ? 'kissangpt' : ''} flex p-4`}>
                            <div className="chat__message flex">
                                <Avatar alt="Remy Sharp" src={entry.user === 'ai' ? aiAvatar : ''} />
                                <div className="message">{entry.message}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-input-holder flex">
                    <form onSubmit={handleSubmit} className="flex w-full">
                        <textarea
                            className="chat-input-textarea"
                            placeholder="Enter your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        ></textarea>
                        <button type="submit">
                            {input && input.length > 0 && (<SendIcon style={{ fontSize: 45, color: '#818182' }} />)}
                        </button>
                    </form>
                </div>
            </div>}
        </>
    );
}

export default Right;
