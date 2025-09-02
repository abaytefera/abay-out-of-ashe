import {
  faArrowLeft,
  faFile,
  faMicrophone,
  faPhone,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { ControlLogic } from "../../ControlLofic/Controllogic";
import { employe } from "../../context/store";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useMessageStore } from "../../context/messageStore";
import { auth, db } from "../../Config/firebase";
import { userControl } from "../../context/Controluser";
import { useInView } from "react-intersection-observer";
const MessageSection = () => {
  const [chat, setChat] = useState(false);
  const isWide = useMediaQuery({ query: "(min-width: 900px)" });
  const { isDarkmode } = ControlLogic();
  const {employee}=employe();
  const [ChatList,setChatList]=useState([]);
  const {activeChatId,employeeData,controlCurrentMessage,ControlMessages,messageCollection}=useMessageStore()
  const [messageText,setMessageText,]=useState('')
  const [isloading,setIsLoading]=useState(false)
  const [isLoadingMessage,setIsLoadingMessage]=useState(false);
 const [flage,seFlage]=useState(false)
  


const {User}=userControl()
const lastMessageRef=useRef(null)

  
 useEffect(() => {
  if (  lastMessageRef.current) {
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  
  }
}, [messageCollection]);

useEffect(() => {
  if (!auth.currentUser?.uid) return;

  try {
     if(!flage){
    setIsLoading(true)
     }

    const refChats = collection(db, "chats");
    const q = query(
      refChats,
      where("participants", "array-contains", auth?.currentUser?.uid),
      orderBy("lastMessageTime", "desc")
    );


    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!snapshot.empty) {
        const chats = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const chatListData = await Promise.all(
          chats.map(async (chat) => {
            // Get participant info
            const participantsData = await Promise.all(
              chat.participants
                .filter(uid => uid !== auth.currentUser.uid)
                .map(async (uid) => {
                  const userRef = doc(db, "users", uid);
                  const userSnap = await getDoc(userRef);
                  return userSnap.exists() ? userSnap.data() : null;
                })
            );

            // Get unseen message count
            const msgRef = collection(db, "chats", chat.id, "messages");
            const msgSnap = await getDocs(msgRef);
            

            let unseenCount = 0;
            if (!msgSnap.empty) {
              unseenCount = msgSnap.docs.filter(
                (doc) => !doc.data().seenBy.includes(auth.currentUser.uid)
              ).length;
              

              
            }
      
   
           

            return {
  chatInfo: chat,
  userInfo: participantsData.filter(Boolean)[0] || null, // return single object or null
  unseenCount
};
          })
        );
console.log(chatListData)
        setChatList(chatListData);
       
      } else {
        setChatList([]);
      }
      setIsLoading(false);
      seFlage(false)
    });

    return () => unsubscribe();
  } catch (error) {
    setIsLoading(false);
    seFlage(false)
    console.error(error.message);
  }
}, [auth.currentUser?.uid,messageCollection]);


console.log(ChatList);


const sendHandler=async(e)=>{
seFlage(true)
e.preventDefault();
const refMessage=collection(db,'chats',activeChatId,"messages")
const newMessage={
senderId:auth.currentUser.uid,
text:messageText,
createdAt: serverTimestamp(),
 seenBy: [auth.currentUser.uid]}
try{
  console.log('start send')
await addDoc(refMessage,newMessage);
const chatRef=doc(db,'chats',activeChatId)
await updateDoc(chatRef,{
lastMessage:messageText,
lastMessageTime: serverTimestamp(),

})

const messageRef=collection(db,'chats',activeChatId,'messages');
const q=query(messageRef,orderBy('createdAt','asc'))

const snapMessage=await getDocs(q);
if(snapMessage.empty){

ControlMessages([]);
}else{
  const mgs=snapMessage.docs.map((Doc)=>({id:Doc.id,...Doc.data()}))
ControlMessages(mgs);

}


setMessageText('')
}catch(error){
console.log(error.message);


}




}




const formatChatTime=(timeStamp)=>{
if(!timeStamp) return
const date=timeStamp.toDate();
const now=new Date();
const isToday= date.toDateString()===now.toDateString();
const yesterday= new Date();
yesterday.setDate(now.getDate() - 1);
const isYesterday = date.toDateString() === yesterday.toDateString();
const dayDiff=Math.floor((now - date) / (1000 * 60 * 60 * 24));

if(isToday){

return date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})


}
else if(isYesterday){

  return 'yesterday'


}
else if(dayDiff<7){
return date.toLocaleDateString([],{weekday:'short'})

}else{

  return date.toLocaleDateString([],{month:'numeric',day:'numeric',year:'numeric'})
}

}

const handleSingleMessage=async(id,userInfo)=>{
  const refMessage=collection(db,'chats',id,'messages');
  const q=query(refMessage,orderBy('createdAt','asc'))
  seFlage(true)

  try{
    setIsLoadingMessage(true)
   


const messageSnap=await getDocs(q);
if(!messageSnap.empty){
const actualMessage=messageSnap.docs.map((mgs)=>({id:mgs.id,...mgs.data()}))
   await Promise.all(actualMessage.map(async(mgsData)=>{
  const refNew=doc(db,'chats',id,'messages',mgsData.id);
 const subRsult=await updateDoc(refNew,{
  seenBy:arrayUnion(auth?.currentUser?.uid)
})


}))

console.log(actualMessage)

controlCurrentMessage(id,userInfo,actualMessage);

}else{
controlCurrentMessage(id,userInfo,[]);
  
}




console.log('Add')
  }catch(error){

console.log(error.message);

  }finally{

setIsLoadingMessage(false)

  }



}

if(isloading) return <div className="flex flex-col  h-screen items-center justify-center "><div className="h-10 w-10 border-4  border-sky-500 rounded-full border-t-transparent animate-spin"></div></div>
  return (
    <div
      className={`${
        isDarkmode ? "bg-gray-800 text-white" : "bg-white"
      } flex w-full pt-5  h-screen overflow-auto  ${!isWide ?"pb-40":"pb-30"}`}
    >
      {/* Sidebar - Chat List */}
      <div
        className={`${
          isWide || !chat ? "flex" : "hidden"
        } flex-col w-full  ${!isWide ? "":"max-w-[300px]"}  border-r shadow-sm ${
          isDarkmode ? "bg-gray-800 text-white" : "bg-white"
        } min-h-0 overflow-hidden`}
      >
        <h2 className="text-2xl font-bold px-4 pt-4 pb-2">Messages</h2>

        {/* Search Bar */}
        <div className="mx-4 mb-3 bg-gray-100 dark:bg-gray-700 rounded flex items-center px-3 py-2">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="search"
            className={`bg-transparent flex-1 outline-none ${
              isDarkmode ? "placeholder:text-gray-300 text-white" : ""
            }`}
            placeholder="Search..."
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto  space-y-4 px-4 pb-4 min-h-0">
          {ChatList.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-2 rounded  ${isDarkmode ? "hover:bg-gray-700":"hover:bg-gray-200"} cursor-pointer`}
              onClick={()=>{
                handleSingleMessage(item.chatInfo.id,item.userInfo)
                setChat(true);
              }
              }
            >
              <div className="flex items-center gap-3">
                <img
                  src={item?.profile || "https://zkjgdrtmexmdmqvstwuz.supabase.co/storage/v1/object/public/my-file/proman.webp"}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="profile"
                />
                <div>
                  <h3 className="font-semibold text-sm">{item?.userInfo?.firstname} {item?.userInfo?.lastname}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item?.chatInfo?.lastMessage.substring(0,15)} {item?.chatInfo?.lastMessage.length>20 && ("...") }
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">

<span className="text-xs text-gray-400">
  {   formatChatTime(item?.chatInfo?.lastMessageTime)}

</span>
 <span className={`px-2 ${item.unseenCount>0 ?"flex":"hidden"} py-0.5  font-bold  items-center justify-center text-xs rounded-full bg-sky-400 text-white`}>
  {item.unseenCount}
</span>
</div>

            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      {
        isLoadingMessage &&( (()=>{

if(isLoadingMessage) return <div className="flex flex-col w-full   h-screen items-center justify-center "><div className="h-10 w-10 border-4  border-sky-500 rounded-full border-t-transparent animate-spin"></div></div>

}))
      ()}

{  


(employeeData)


?
  (
  <div
        className={`flex flex-col flex-1 min-h-0 overflow-hidden ${
          chat || isWide ? "flex" : "hidden"
        } ${isDarkmode ? "bg-gray-800" : "bg-white"}`}
      >
        {/* Mobile back arrow */}
        {!isWide && (
          <span
            className="p-4 block md:hidde cursor-pointer"
            onClick={() => setChat(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        )}

        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src="bit.png"
              className="w-10 h-10 rounded-full object-cover"
              alt="profile"
            />
            <div>
              <h1 className="font-bold">{employeeData?.firstname} {employeeData?.lastname}</h1>
              <p className="text-green-400 text-sm">Online</p>
            </div>
          </div>
          <div className="flex gap-4 text-xl">
            <FontAwesomeIcon
              icon={faVideo}
              className="text-pink-600 cursor-pointer"
              title="Video Call"
            />
            <FontAwesomeIcon
              icon={faPhone}
              className="text-green-600 cursor-pointer"
              title="Voice Call"
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 flex  flex-col overflow-y-auto   px-4 py-4 space-y-4 " >
          {(messageCollection ?? []).map((msg, i) => (
            <div 
       
              key={msg.id}
              className={`flex px-2 space-x-10 space-y-0 m-w-10 py-2 rounded-xl ${ msg.senderId === auth.currentUser.uid ? "bg-gray-400 text-white":"bg-sky-500 text-white"} flex-col max-w-[60%] ${
                msg.senderId === auth.currentUser.uid ? "self-end items-end" : "self-start"
              }`}
            >
              {msg?.profile && (
                <img
                  src={msg?.profile }
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
            
              <div className={` `}>
                {msg.text}
              </div>
              <span className={`self-end justify-self-center text-[10px]`}>{formatChatTime(msg.createdAt)}</span>
             
            </div>
          ))}
          <div ref={lastMessageRef}></div>
        </div>

        {/* Message Input */}
        <div
          className={`w-full flex items-end gap-4 px-4 py-3 ${
            isDarkmode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <div className="text-xl text-gray-700 dark:text-white flex gap-3">
            <FontAwesomeIcon icon={faFile} className="cursor-pointer" />
            <FontAwesomeIcon icon={faMicrophone} className="cursor-pointer" />
          </div>
          <textarea
            rows={1}
            placeholder="Type a message..."
            className={`flex-1 resize-none rounded px-4 py-2 max-h-[150px] outline-none ${
              isDarkmode ? "bg-gray-800 text-white" : "bg-white"
            }`}
            onInput={(e) => {
            setMessageText(e.target.value)
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            value={messageText}
          />
          <button  onClick={sendHandler} className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded">
            Send
          </button>
        </div>
      </div>
  ) :(
          (isWide && !isLoadingMessage  )  &&(


          
      <div className="flex justify-center items-center text-gray-600 w-full">
          Select a chat to start messaging
        </div>
         ))
      }
    
        
     
    </div>
  );
};

export default MessageSection;
