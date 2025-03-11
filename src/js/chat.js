import { db } from "./firebase.js";
import {collection,addDoc,onSnapshot, Timestamp,query,where,orderBy,getDocs,deleteDoc,doc} from "firebase/firestore"


export function Chatroom(room,username){

    let curroom = room;
    let curuser = username;
    const dbRef = collection(db,'chats');
    let unsubscribe = null;


    const addChat = async (message)=>{

        const now = new Date();
        const chatdata = {
            username:curuser,
            room:curroom,
            message,
            created_at:Timestamp.fromDate(now)
        };

        try{

            const response = await addDoc(dbRef,chatdata);
            return response;

        }catch(err){
            console.log("Error addchat = ",err);
            throw err;
        }

    }

    const getChats = (callback)=>{

        // onSnapshot(
        //     query(dbRef,where('room','==',curroom),orderBy('created_at'))
        //     ,(docSnap)=>{

        //         docSnap.forEach(doc=>{
        //         // console.log(doc.data());
        //         callback(doc.data());
        //     });
        // });

        // if(unsubscribe){
        //     unsubscribe();
        // }

        if(unsubscribe)unsubscribe();

        unsubscribe = onSnapshot(
            query(dbRef,where('room','==',curroom),orderBy('created_at'))
            ,(docSnap)=>{

                docSnap.docChanges().forEach((item)=>{
                // console.log(item.data());
                // console.log(item.doc.data());

                if(item.type === "added"){
                    callback(item.doc.data());
                }
               

            });
        });

        // console.log(unsubscribe);


       

    }

    const updateChatroom = (newroom)=>{
        curroom = newroom;
        // console.log(`Room changed to ${curroom}`);

    }

    const updateUsername = (newusername)=>{
        curuser = newusername;
        localStorage.setItem("username",curuser);

        // console.log(`Username changed to ${curuser}`);

    }
    //Delete all messages every 15s

    const deleteAllMessage = () =>{
        let deleteinter = setInterval(async()=>{

            try{

                const getdatas = await getDocs(dbRef);

                // stop function call if no data in firebase 
                if(getdatas.empty){
                    console.log("No message to delete ");

                    clearInterval(deleteinter);//stop interval

                    return;
                }


                getdatas.forEach(async(getdata)=>{
                    await deleteDoc(doc(db,'chats',getdata.id));
                });
                console.log("all messages deleted successfully");

            }catch(error){
                console.error("Error deleteing message : ",error);
            }

        },5000);
    }
    deleteAllMessage()

    return { addChat, getChats, updateUsername, updateChatroom };


}

