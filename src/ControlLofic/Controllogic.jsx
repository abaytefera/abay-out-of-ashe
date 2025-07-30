import { create } from "zustand";
export const ControlLogic=create((set)=>({
isDarkmode:false,
ControlDarkMode:()=>{
set((state)=>({...state,isDarkmode:!state.isDarkmode}))

}




}))