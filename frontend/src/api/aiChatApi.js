import axios from "./axiosConfig";

export const sendChatMessage = async (message) => {
    const response = await axios.post("/ai/chat", {
        message: message,
    });

    return response.data;
};