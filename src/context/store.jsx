import { create } from 'zustand'
import  {collection,doc, getDoc, updateDoc} from 'firebase/firestore'
import { db } from '../Config/firebase'

export const  employe=create((set)=>({
employee:null,
PasswordChange:false,
fetchemployee:async(uid)=>{
if(!uid) return set({employee:null,PasswordChange:false}) 
const docRef=doc(db,'users',uid);
const docSnap=await getDoc(docRef)
if(docSnap.exists()){

set({employee:docSnap.data(),PasswordChange:docSnap.data().PasswordChange});

}else{
set({employee:null,PasswordChange:false});


}
return true;
},
updateChangePassword:async(uid)=>{
    try{

const docRef=doc(db,'users',uid);

const docSnap=await updateDoc(docRef,{
    PasswordChange:true
});

return 'successfuly update';
    }catch(error){

throw new Error(error.code);
    }




}


}))