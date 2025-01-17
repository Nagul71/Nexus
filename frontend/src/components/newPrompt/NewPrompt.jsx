import React from 'react'
import './newPrompt.css'
import { useEffect,useRef,useState} from 'react'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'
import Markdown from "react-markdown"
import model from '../../AI/gemini'
import { useMutation, useQueryClient } from 'react-query'



function NewPrompt({data}) {
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
    const formRef = useRef(null)

    useEffect(()=>{
      endRef.current.scrollIntoView({behavior:"smooth"})
  
    },[data,question,answer,img.dbData])

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({question : question.length ? question : undefined,
          answer : answer,
          img: img.dbData?.filePath || undefined,
         }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["chat",data._id] }).then(()=>{
        formRef.current.reset()
        setQuestion("")
        setAnswer("")
        setImg({
          isLoading:false,
          error:"",
          dbData:{},
          aiData:{},
        })
      });
    },
    onError:(err)=>{
      console.log(err)
    }
  });

  // IN PRODUCTION WE DON'T NEED IT
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);



    const add= async(text,isInitial)=>{
      if(!isInitial) setQuestion(text)
      try{
      const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text]:[text]);
      let accutext = "";
      for await (const chunk of result.stream){
        const chunkText = chunk.text();
        console.log(chunkText);
        accutext += chunkText;
        setAnswer(accutext);
      }

      mutation.mutate();

    }catch(err)
      {

        console.log(err)

      }

    };

    const handleSubmit = async (e)=>{
      e.preventDefault();
      const text = e.target.text.value;
      if(!text) return;

      add(text,false);
    };


  return <>
  
  {img.isLoading && <div className=''>Loading....</div>}
  {img.dbData?.filePath &&(
    <div className='message user'>
    <IKImage
       urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
       path={img.dbData?.filePath}
       width="380"
       transformation={[{width: 380}]}
    />
    </div>

  )}
  
  {question && <div className='message user'>{question}</div>}
  {answer && <div className='message'><Markdown>{answer}</Markdown></div>}
  <div className="endChat" ref={endRef}></div>
  <div className="newPrompt">
    <form className='newForm'onSubmit={handleSubmit} ref={formRef}>
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