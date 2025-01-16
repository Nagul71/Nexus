import React from 'react'
import './newPrompt.css'
import { useEffect,useRef,useState} from 'react'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'
import Markdown from "react-Markdown"
import model from '../../AI/gemini'



function NewPrompt() {
  const [question,setQuestion] = useState("");
  const [answer,setAnswer]=useState("");
  const [img,setImg] = useState({
    isLoading:false,
    error:"",
    dbData:{},
    aiData:{},
  })

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generateConfig:{
      //maxOutputTokens: 100,
    }
  });


    const endRef = useRef(null)
    useEffect(()=>{
      endRef.current.scrollIntoView({behavior:"smooth"})
  
    },[question,answer,img.dbData])

    const add= async(text)=>{
      setQuestion(text)
      const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text]:[text]);
      let accutext = "";
      for await (const chunk of result.stream){
        const chunkText = chunk.text();
        console.log(chunkText);
        accutext += chunkText;
        setAnswer(accutext);
      }

      setImg({
        isLoading:false,
        error:"",
        dbData:{},
        aiData:{},
      })

    };

    const handleSubmit = async (e)=>{
      e.preventDefault();
      const text = e.target.text.value;
      if(!text) return;

      add(text);
    };


  return <>
  {img.isLoading && <div className=''>Loading....</div>}
  {img.dbData?.filePath &&(
    <IKImage
       urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
       path={img.dbData?.filePath}
       width="380"
       transformation={[{width: 380}]}
    />

  )}
  {question && <div className='message user'>{question}</div>}
  {answer && <div className='message'><Markdown>{answer}</Markdown></div>}
  <div className="endChat" ref={endRef}></div>
  <div className="newPrompt">
    <form className='newForm'onSubmit={handleSubmit}>
            <Upload setImg={setImg}/>
        <input id="file" type="file" multiple={false} hidden/>
        <input type="text" name="text" placeholder="Ask Nexus"/>
        <button>
            <img src="/assets/top.png" alt=""/>
        </button>
    </form>
  </div>
  </>
}

export default NewPrompt