import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import db from "../firebase";
import { collection, addDoc ,getDocs} from "firebase/firestore";

async function fetchData(setChats) {
  try {
    const querySnapshot = await getDocs(collection(db, "chats"));
    const fetchedChats = [];
    querySnapshot.forEach((doc) => {
      fetchedChats.push({ id: doc.id, data: doc.data() });
    });
    setChats(fetchedChats);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function Sidebar({ menu, setMenu,setChatid }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchData(setChats); // Call the async function with the setter function
  }, []);

  const handleNewChat = async () => {
    const chatName = prompt("Enter the name of the new chat:");
    if (chatName) {
      try {
        const docRef = await addDoc(collection(db, "chats"), { name: chatName });
        console.log("Chat added with ID: ", docRef.id);
        // Fetch updated chats from Firestore
        fetchData(setChats);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <div className={`${!menu ? 'side' : 'side_x'} w-1/5 h-screen p-2`}>
      <div className="sidemenu__button p-2 pl-8 text-white text-left text-2xl" onClick={handleNewChat}>
        <span className='pl-2 pr-3'>+</span>
        New Chat
      </div>
      <div className="separator"></div>
      {/* Here we will render all chats */}
      {chats.map((chat) => (
        <div className="sidebarChat" key={chat.id} onClick={() => setChatid(chat.id)}>
          <p>{chat.data.name}</p>
        </div>
      ))}
      {
        menu && <div className="back_button">
          <button onClick={() => setMenu(false)}>Back</button>
        </div>
      }
    </div>
  )
}

export default Sidebar;
