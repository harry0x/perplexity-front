import { initializeSocketConnection } from "../service/chat.socket";
import { useDispatch } from "react-redux";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api";
import {
  setChats,
  setLoading,
  setCurrentChatId,
  setError,
} from "../chat.slice";

export const useChat = () => {
  const dispatch = useDispatch();

  const handleSendMessage = async ({ message, chatId }) => {
    dispatch(setLoading(true));

    const response = await sendMessage({ message, chatId });
    const { chat, aiMessage } = response;
    dispatch(
      setChats((prev) => {
        return {
          ...prev,
          [chat._id]: {
            ...chat,
            messages: [{ content: message, role: "user" }, aiMessage],
          },
        };
      }),
    );
    dispatch(setCurrentChatId(chat._id));
  };

  return {
    initializeSocketConnection,
    handleSendMessage,
  };
};
