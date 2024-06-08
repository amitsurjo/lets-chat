import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import { db } from "./firebase";
import {
  doc,
  getDocs,
  collection,
  getDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const docRef = collection(db, "rooms");

      // Register a listener for changes to the rooms collection
      const unsubscribe = onSnapshot(docRef, async (snapshot) => {
        const roomData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));

        // Update the rooms state variable with the latest data
        setRooms(roomData);
      });

      // Return the unsubscribe function so that we can call it later to unsubscribe from the listener
      return unsubscribe;
    }

    fetchData();
  }, [value]);

  async function add_room() {
    const val = window.prompt("Enter the name of the room");
    if (val !== null) {
      try {
        setValue(!value);
        const docRef = await addDoc(collection(db, "rooms"), {
          name: val,
        });
        const messagesRef = collection(docRef, "messages");
        await addDoc(messagesRef, {
          message: "",
          name: "",
          timestamp: new Date(),
        });

        console.log("Room added with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding room: ", error);
      }
    }
  }
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton>
          <Avatar
            src={user.photoURL}
            style={{ width: "60px", height: "60px" }}
          />
        </IconButton>

        <div className="sidebar_headerRight">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <SearchIcon />
        <input type="text" placeholder="Search or start a new chat" />
      </div>

      <div className="sidebar_chats">
        {/* <SidebarChat /> */}
        <div className="add_new" onClick={add_room}>
          <h2>Add new room</h2>
        </div>
        {rooms.map((room, index) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
