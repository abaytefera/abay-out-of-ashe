import { create } from "zustand";

export const useMessageStore = create((set) => ({
  activeChatId: null,
  employeeData: null,
  messageCollection:null,
newMessageCount:0,
  
  controlCurrentMessage: (id, data,messageCollection) => {
    if (!id || !data) {return(

(set({
      activeChatId: null,
      employeeData: null,
      messageCollection:null
    }))

    )




    };
    return (set({
      activeChatId: id,
      employeeData: data,
      messageCollection:messageCollection
    }))
  },
  ControlMessages:(message)=>{
return(set((pre)=>({...pre,messageCollection:message})));


  },
  controlNewMessage:(newMessageCount)=>{
return(set((pre)=>({...pre,newMessageCount})));


  }
}));
