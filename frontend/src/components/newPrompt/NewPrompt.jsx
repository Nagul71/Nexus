import React, { useState, useRef, useEffect } from 'react';
import './newPrompt.css';
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import Markdown from "react-markdown";
import model from '../../AI/gemini';
import { useMutation, useQueryClient } from 'react-query';

function NewPrompt({ data }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: data?.history?.map(({ role, parts }) => ({
      role,
      parts: [{ text: parts[0]?.text || "" }], // Ensure parts[0] exists and has a text value
    })) || [], // Default to an empty array if data.history is undefined
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });
  

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer: answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] }).then(() => {
        setQuestion(""); // Reset question immediately after submission
        setAnswer("");   // Reset answer immediately after submission
        setImg({
          isLoading: false,
          error: "",
          dbData: {},
          aiData: {},
        });
      });
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);
    try {
      const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, text] : [text]);
      let accutext = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accutext += chunkText;
        setAnswer(accutext);
      }

      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    // Reset the form immediately before sending the message to AI
    formRef.current.reset();
    setQuestion(""); // Reset question immediately after submission
    setAnswer("");   // Reset answer immediately after submission

    add(text, false); // Send the message to the AI
  };

  return (
    <>
      {img.isLoading && <div className=''>Loading....</div>}
      {img.dbData?.filePath && (
        <div className='message user'>
          <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            width="380"
            transformation={[{ width: 380 }]}
          />
        </div>
      )}

      {question && <div className='message user'>{question}</div>}

      <div className="message">
        <div className="message-avatar">
          {answer && (
            <Markdown>
              {answer}
            </Markdown>
          )}
          <img
            src="/assets/imglogo.png"
            alt="AI Assistant"
          />
        </div>
      </div>
      <div className="endChat" ref={endRef}></div>
      <div className="newPrompt">
        <form
          className='newForm'
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Upload setImg={setImg} />
          <input id="file" type="file" multiple={false} hidden />
          <input
            type="text"
            name="text"
            placeholder="Ask Nexus"
          />
          <button>
            <img src="/assets/top.png" alt="" />
          </button>
        </form>
      </div>
    </>
  );
}

export default NewPrompt;
