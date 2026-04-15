import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setChats, setCurrentChatId, setLoading, setError } =
  chatSlice.actions;

export default chatSlice.reducer;

// chats = {
//   "docker and AWS": {
//     messages: [
//       {
//         role: "user",
//         content: "What is Docker?",
//       },
//       {
//         role: "ai",
//         content:
//           "Docker is a platform for developing, shipping, and running applications in containers.",
//       },
//     ],
//     id: "docker and AWs",
//     lastUpdated: "2026-04-13T08:56:00+05:30",
//   },
// };
