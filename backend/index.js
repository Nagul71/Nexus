import express from "express"
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import UserChats from './Schema/userchat.js'
import Chat from "./Schema/aichat.js"
import {ClerkExpressRequireAuth} from '@clerk/clerk-sdk-node'


const port = process.env.PORT || 3000
const app = express();

app.use(cors({
  origin: 'https://nexus-v5el.vercel.app', // Replace with your frontend's deployed URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // If you're using cookies or authentication headers
}));

app.use(express.json())

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB Connected")
        
    } catch (error) {
        console.log(error);
        
    }
}


const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  });


app.get("/api/upload",(req,res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

// app.get("/api/test",ClerkExpressRequireAuth(),(req,res)=>{
//     const userId = req.auth.userId;
//     req.send("Success!")
// })

app.post("/api/chats", ClerkExpressRequireAuth(), async (req,res)=>{
    const userId =  req.auth.userId
    const {text} = req.body
    try {
        // new Chat
        const newChat = new Chat({
            userId:userId,
            history:[{role:"user",parts:[{text}]}]

        });

        const savedChat = await newChat.save()
       
       const userChats = await UserChats.find({userId: userId}) 
       if(!userChats.length){
        const newUserChats = new UserChats({
            userId:userId,
            chats:[

                {
                    _id:savedChat._id,
                    title:text.substring(0,40)


                }
            ]
        })
        await newUserChats.save()
       }else{
        await UserChats.updateOne({userId:userId},{
            $push:{
                chats:{
                    _id:savedChat._id,
                    title: text.substring(0,40)
                }
            }
        });

        res.status(201).send(newChat._id);
       }
    } catch (error) {
        console.log(error)
        res.status(500).send("Error creating Chat")
        
    }
});

app.get("/api/userchats",ClerkExpressRequireAuth(),async(req,res)=>{
    const userId = req.auth.userId;
    try{
        const userChats = await UserChats.find({userId});
        res.status(200).send(userChats[0].chats)
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error creating userchats!")
    }
})

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
  
    try {
      const chat = await Chat.findOne({ _id: req.params.id, userId });
  
      res.status(200).send(chat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching chat!");
    }
  });

  app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
  
    const { question, answer, img } = req.body;
  
    const newItems = [
      ...(question
        ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
        : []),
      { role: "model", parts: [{ text: answer }] },
    ];
  
    try {
      const updatedChat = await Chat.updateOne(
        { _id: req.params.id, userId },
        {
          $push: {
            history: {
              $each: newItems,
            },
          },
        }
      );
      res.status(200).send(updatedChat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error adding conversation!");
    }
  });


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(401).send('Unauthenticated!')
  })

app.listen(port,()=>{
    connect()
    console.log("Server running on 3000");
})