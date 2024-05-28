import { createContext, useContext, useEffect, useState } from "react";
import Login from "../components/Authentication/Login";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();

  // const navigate = useNavigate();
  // let userInfo;
  // const params = useParams();
  const currentUser = localStorage.getItem("userInfo");
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    // if (!userInfo) {
    //   // navigate("/");
    //   // return <Login/>
    // }
  }, [currentUser]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
