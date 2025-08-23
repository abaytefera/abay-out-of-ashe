import React from "react";

const App = () => {
  const profile = {
    name: "John Doe",
    email: "john@example.com",
    age: 28,
  };

  const handleDownload = () => {
    const url="https://zkjgdrtmexmdmqvstwuz.supabase.co/storage/v1/object/public/my-file/file/1751638818700_freepik__the-style-is-candid-image-photography-with-natural__42247.jpeg ";
    const a = document.createElement("a");
    a.href =url
    a.download = "profileimage"; // file name
    a.click();
   
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      Download Profile
    </button>
  );
};

export default App;
