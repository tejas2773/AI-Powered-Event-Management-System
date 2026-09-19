import { useState } from "react";
import { sendChatMessage } from "../api/aiChatApi";

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm your Event Assistant. How can I help you?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const message = input.trim();

    if (!message || loading) {
      return;
    }

    // Add user message
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "user",
        text: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const data = await sendChatMessage(message);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "ai",
          text: data.response,
        },
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "ai",
          text: "Sorry, I couldn't connect to the AI service. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "ai",
        text: "Hi! 👋 I'm your Event Assistant. How can I help you?",
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50
                               w-16 h-16 rounded-full
                               bg-blue-600 text-white
                               shadow-lg
                               hover:bg-blue-700
                               transition-all duration-200
                               flex items-center justify-center
                               text-2xl"
          aria-label="Open AI Chat"
        >
          🤖
        </button>
      )}

      {/* Chat Window */}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50
                               w-[380px] max-w-[calc(100vw-32px)]
                               h-[550px]
                               bg-white
                               rounded-2xl
                               shadow-2xl
                               border border-gray-200
                               flex flex-col
                               overflow-hidden"
        >
          {/* Header */}

          <div
            className="bg-blue-600 text-white
                                   px-4 py-3
                                   flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10
                                           rounded-full
                                           bg-white/20
                                           flex items-center
                                           justify-center"
              >
                🤖
              </div>

              <div>
                <h3 className="font-semibold">Event Assistant</h3>

                <p className="text-xs text-blue-100">AI powered assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="text-sm
                                           px-2 py-1
                                           rounded
                                           hover:bg-white/20"
                title="Clear chat"
              >
                🗑️
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-xl
                                           w-8 h-8
                                           rounded-full
                                           hover:bg-white/20"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}

          <div
            className="flex-1
                                   overflow-y-auto
                                   p-4
                                   bg-gray-50
                                   space-y-3"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%]
                                                px-4 py-2
                                                rounded-2xl
                                                text-sm
                                                whitespace-pre-wrap
                                                ${
                                                  message.sender === "user"
                                                    ? "bg-blue-600 text-white rounded-br-md"
                                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                                                }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Loading */}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="bg-white
                                               border border-gray-200
                                               px-4 py-3
                                               rounded-2xl
                                               rounded-bl-md"
                >
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2
                                                       bg-gray-400
                                                       rounded-full
                                                       animate-bounce"
                    />

                    <span
                      className="w-2 h-2
                                                       bg-gray-400
                                                       rounded-full
                                                       animate-bounce
                                                       [animation-delay:150ms]"
                    />

                    <span
                      className="w-2 h-2
                                                       bg-gray-400
                                                       rounded-full
                                                       animate-bounce
                                                       [animation-delay:300ms]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}

          <div className="p-3 bg-white border-t">
            <div
              className="flex items-center gap-2
                                       border border-gray-300
                                       rounded-xl
                                       px-3 py-2
                                       focus-within:ring-2
                                       focus-within:ring-blue-500"
            >
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about events..."
                rows="1"
                disabled={loading}
                className="flex-1
                                           resize-none
                                           outline-none
                                           text-sm
                                           max-h-24"
              />

              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="w-10 h-10
                                           rounded-lg
                                           bg-blue-600
                                           text-white
                                           flex items-center
                                           justify-center
                                           hover:bg-blue-700
                                           disabled:bg-gray-300
                                           disabled:cursor-not-allowed
                                           transition"
              >
                ➤
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-2">
              Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatbot;
