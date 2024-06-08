import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Link } from "react-router-dom";
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
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
function SidebarChat({ name, id }) {
  // console.log("klfdjsj", name, id);
  const [messages, setMessages] = useState([]);
  // const [value, setValue] = useState(true);
  useEffect(() => {
    async function fetchData() {
      if (id !== null) {
        // Check if roomsId is not null

        const messagesCollection = collection(db, "rooms", id, "messages");
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
  }, [id]);

  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src="https://api.dicebear.com/7.x/adventurer/svg?seed=Pepper"
          style={{ width: "60px" }}
        />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>
            {messages.length > 0 ? messages[messages.length - 1].message : ""}
            {console.log(messages)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
