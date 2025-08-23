import { create } from "zustand";
export const useLoginControl=create((set)=>({
Loginpage:false,
controlLoginPage:(result)=>{


set({Loginpage:result})
}


}))
