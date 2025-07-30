import { create } from "zustand";
import { db } from "../Config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const userControl = create((set) => ({
  User: null,
  UserInformation: null,
  ChangeUserInformation: async (user) => {
    if (user) {
      try {
        const docref = doc(db, 'users', user.uid);
        const docData = await getDoc(docref);
        return set({ User: user, UserInformation: docData.data() });
      } catch (err) {
        throw new Error(err.code);
      }
    }else{
    return  set({user:null,UserInformation:null});
    }
  },
  
}));
