import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, Firestore, getDoc, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../../Config/firebase";
import { employe } from "../../context/store";
import { useMessageStore } from "../../context/messageStore";
function EmployeeProfile() {
  const { id } = useParams();  // employee id from url
  const [employeestore, setEmployee] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const {employee}=employe();
  const {controlCurrentMessage}=useMessageStore();

  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    try{
       
    const fetchEmployee = async () => {
        const ref=doc(db,"users",id)
        const onSnap=await getDoc(ref)
    //   const doc = await firestore.collection("users").doc("k4rDnhRpxAh5oCGIIvZuMG89GA52").get();
      if (onSnap.exists) {
        setEmployee({ id: onSnap.id, ...onSnap.data() });
      }
    }
     fetchEmployee();
}
    catch(error){



    }
   
  }, [id]);

  const startChat = async () => {
  if (!employeestore) return;
try{
  setLoading(true)
  // Create a query to find chats where employee.id is a participant
  const ref = collection(db, "chats");
  const q = query(ref, where("participants", "array-contains", auth.currentUser.uid));

  const querySnapshot = await getDocs(q);
  let chatDoc = null;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.participants.includes(employeestore?.id)) {
      console.log("fetch chatid")
      chatDoc = { id: doc.id };
    }
  });

  // If no chat exists, create one
  if (!chatDoc) {
    const newChatRef = await addDoc(collection(db, "chats"), {
      participants: [auth.currentUser.uid, employeestore.id],
      createdAt: serverTimestamp(),
    });
    chatDoc = { id: newChatRef.id };
  }

let messageCollection=[];
  if(chatDoc){
  
const messagesRef=collection(db,'chats',chatDoc.id,'messages');
const q=query(messagesRef,orderBy('createdAt','asc'))
const Snapmessage=await getDocs(q);
if(Snapmessage.empty){
messageCollection=[]

}else{
messageCollection=Snapmessage.docs.map((Doc)=>({id:Doc.id,...Doc.data()}));
}


  }
console.log(messageCollection);
controlCurrentMessage(chatDoc.id, employeestore,messageCollection);
  navigate("/message");
}catch(error){

  console.log(error.message);



}finally{

  setLoading(false);
}
};

  if (!employeestore) return (<div className="flex items-center justify-center">

    <div className="w-10 h-10 rounded-full  border-4 border-sky-500 animate-spin  border-t-transparent "></div>
  </div>);

      if(loading) return (<div className="flex items-center justify-center">

    <div className="w-10 h-10 rounded-full  border-4 border-sky-500 animate-spin  border-t-transparent "></div>
  </div>);

  return (
    <div className="  flex flex-col gap-10 px-10 py-6  justify-start">
     <div className="flex gap-4 items-center">
         <img src={"https://zkjgdrtmexmdmqvstwuz.supabase.co/storage/v1/object/public/my-file/proman.webp"} alt={employee?.firstname} className="w-37 rounded-[50%] object-cover"  />
      <div >
        <h1 className="text-lg text-gray-700 font-bold capitalize">{employeestore.firstname} {employeestore.lastname}</h1>
      <p><strong>Role:</strong> {employeestore.role}</p>
      </div>

      </div>
     <div className="flex max-md:flex-col gap-4 justify-around"> 
      <p><strong>Education:</strong> {employeestore.EducationBackground}</p>
      <p><strong>Phone:</strong> {employeestore.phone}</p>
      <p><strong>Email:</strong> {employeestore.email}</p>
</div>
      <button onClick={startChat} className="bg-blue-500 cursor-pointer text-white text-lg rounded-md px-3 py-3 self-center" >Message</button>

     
    </div>
  );
}

export default EmployeeProfile;
