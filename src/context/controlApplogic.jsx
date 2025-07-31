import { create } from "zustand";
export const Controllogic=create((set)=>({
Click:false,
ControlDisplay:()=>{
    set((state)=>({...state,Click:!state.Click}));
},
FalseDisplay:()=>{
set((state)=>({...state,Click:false}));

}


}))


