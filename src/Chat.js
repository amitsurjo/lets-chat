import React, { useEffect, useState, useCallback } from "react";
import { Avatar, IconButton, snackbarClasses } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

import { db } from "./firebase";
import { actionTypes } from "./reducer";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

import { Button } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
function Chat() {
  const [{ user, message }, dispatch] = useStateValue();
  const { roomsId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      const messagesCollection = collection(db, "rooms", roomsId, "messages");
      addDoc(messagesCollection, {
        message: text,
        name: user.displayName,
        timestamp: Timestamp.fromDate(new Date()),
      });

      setText("");
    },
    [text, roomsId, user?.displayName]
  );

  useEffect(() => {
    async function fetchData() {
      if (roomsId !== null) {
        // Check if roomsId is not null
        const docRef = doc(db, "rooms", roomsId);
        const docSnap = await getDoc(docRef);
        setRoomName(docSnap.data()?.name);

        const messagesCollection = collection(db, "rooms", roomsId, "messages");
        const messagesQuery = query(
          messagesCollection,
          orderBy("timestamp", "asc")
        );

        onSnapshot(messagesQuery, async (snapshot) => {
          const messageData = snapshot.docs.map((doc) => doc.data());
          setMessages(messageData);
        });

        // Unsubscribe from the listener
        // unsubscribe();
      }
    }

    fetchData();
  }, [roomsId, sendMessage]);

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src="https://api.dicebear.com/7.x/adventurer/svg?seed=Abby" />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {messages.length > 0 &&
              new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toLocaleString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message, index) =>
          message.message !== "" ? (
            <div
              key={index}
              className={`chat_message ${
                message.name === user.displayName && "chat_receiver"
              }`}
            >
              <span className="chat_name">{message.name}</span>
              <p>{message.message}</p>
              <span className="chat_timestamp">
                {new Date(message.timestamp.seconds * 1000).toLocaleString()}{" "}
                {/* Convert Firestore timestamp to a readable format */}
              </span>
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>

        <form action="">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here"
          />
          <Button type="submit" onClick={sendMessage} variant="contained">
            Send a message
          </Button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
