import React from "react";
import "./chatList.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ChatList() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
  });

  console.log("API URL:", import.meta.env.VITE_API_URL);

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Nexus AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isLoading
          ? "Loading..."
          : error
          ? `Error: ${error.message}`
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/assets/imglogo.png" alt="" />
        <Link to="/price">
          <div className="texts">
            <span>Upgrade to Nexus AI Pro</span>
            <span>Get unlimited access to all features</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ChatList;
