import React from 'react'
import './chat.css'
import NewPrompt from '../../components/newPrompt/NewPrompt'
import { useQuery } from "@tanstack/react-query";
import { useLocation } from 'react-router-dom'
import { IKImage } from 'imagekitio-react'
import Markdown from "react-markdown"

function Chat() {
  const path = useLocation().pathname
  const chatId = path.split("/").pop()

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log(data);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending ? (
            <div className="message">Loading...</div>
          ) : error ? (
            <div className="message">Something wrong</div>
          ) : (
            data?.history?.map((message, i) => (
              <React.Fragment key={i}>
                {message.img && (
                  <div className="message user">
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="150"
                      width="200"
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  </div>
                )}
                {message.parts[0].text && (
                  <div className={`message ${message.role === "user" ? "user" : ""}`}>
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                )}
              </React.Fragment>
            ))
          )}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  )
}

export default Chat