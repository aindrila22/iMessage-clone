import React, { useEffect, useState } from 'react';
import "./Chat.css";
import MicIcon from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatName } from './features/chatSlice';
import db from './firebase';
import firebase from './firebase';
import { selectUser } from './features/userSlice';

function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
   const chatName = useSelector(selectChatName);
   const chatId = useSelector(selectChatName);
   const [messages, setMessages] = useState([]);

useEffect(() => {
  if (chatId){
      db.collection('chats').doc(chatId).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
          })))
      });
  }
}, [chatId])

     const sendMessage = e => {
         e.preventDefault();

         db.collection("chats").doc(chatId).collection("messages").add({
             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
             message: input,
             uid: user.uid,
             photo: user.photo,
             email: user.email,
             displayName: user.displayName,
         });
setInput("");
     }
    return (
        <div className="chat">
           < div className="chat_header">
                 <h4>To: <span className="chat_name">{chatName}</span></h4>
                 <strong>Details</strong>
               </div>
            <div className="chat_messages">
            {messages.map(({ id, data}) => (
                <Message key={id} contents={data} />
            ))}
            
           
            </div>
            <div className="chat_input">
            <form>
                 <input value={input}
                 onChange={(e)=> setInput(e.target.value)}
                  type="text" placeholder="iMessage" />
                 <button onClick={sendMessage}>Send Message</button>
            </form>
<IconButton><MicIcon className="chat_mic" /></IconButton>

            </div>
        </div>
    )
}

export default Chat
